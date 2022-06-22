const mysql = require('../mysql');
const mysqlLogin = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const uuid = require('uuid');
const SMTP_CONFIG = require('../config/smtp');
const nodemailer = require('nodemailer');


exports.cadastrarUsuario = async (req, res, next) =>{

    try{
        var query = 'SELECT * FROM usuario WHERE EMAIL = ?';
        var result = await mysql.execute(query,[req.body.EMAIL]);

         if(result.length > 0){
             return   res.status(409).send({mensagem:'Usuário já cadastrado'})
            }

            const hash = await bcrypt.hashSync(req.body.SENHA, 10);
            const guid = uuid.v4();
            const now = new Date()


            query =  'INSERT INTO usuario ( COD_PERFIL_USUARIO, GUID, NOME, EMAIL, SENHA, registrationDate)  Values (?, ?, ?, ?, ?, ? )';
      
            const results= await mysql.execute(query,[req.body.COD_PERFIL_USUARIO, guid, req.body.NOME,  req.body.EMAIL, hash, now]);

             const response = {
                                mensagem: 'Usuário criado com sucesso',
                                usuarioCriado:{
                                    CODIGO: results.insertId,
                                    COD_PERFIL_USUARIO:  req.body.COD_PERFIL_USUARIO,
                                    GUID: guid,
                                    NOME: req.body.NOME,
                                    SENHA: hash,
                                    EMAIL: req.body.EMAIL 
                                }
                            }
                              return res.status(201).send(response);
        
    } catch (error){

         return res.status(500).send({ error: error });

    }

};

exports.Login = async (req, res, next) => {

    try {

        const query = `SELECT * FROM usuario WHERE EMAIL = ?`;
        var results = await mysql.execute(query, [req.body.EMAIL]);
      

        if ((results.length < 1) || (bcrypt.compareSync(req.body.SENHA, results[0].SENHA) == false)) {
            return res.status(401).send({ message: 'Falha na autenticação' })
        }

        


        if (await (results[0].activeJWT == null)) {
      
            const token = jwt.sign({
                CODIGO: results[0].CODIGO,
                GUID: results[0].GUID,
                NOME: results[0].NOME,
                COD_PERFIL_USUARIO: results[0].COD_PERFIL_USUARIO
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            });

              const query2 = `UPDATE usuario 
                    SET activeJWT               = ?
                    WHERE CODIGO                = ? `;
               await mysql.execute(query2, [
                    token,
                    results[0].CODIGO
                ]);

           return res.status(200).send({
                message: 'Autenticado com sucesso',
                CODIGO: results[0].CODIGO,
                GUID: results[0].GUID,
                NOME: results[0].NOME,
                COD_PERFIL_USUARIO: results[0].COD_PERFIL_USUARIO,
                token: token
            });

           
        }else {
          var accept = req.body.accept;
           //console.log(accept);
          if(accept){
                 const token = jwt.sign({
                    CODIGO: results[0].CODIGO,
                    GUID: results[0].GUID,
                    NOME: results[0].NOME,
                    COD_PERFIL_USUARIO: results[0].COD_PERFIL_USUARIO
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                });

                  const query2 = `UPDATE usuario 
                        SET activeJWT               = ?
                        WHERE CODIGO                = ? `;
                   await mysql.execute(query2, [
                        token,
                        results[0].CODIGO
                    ]);

               return res.status(200).send({
                    message: 'Autenticado com sucesso',
                    CODIGO: results[0].CODIGO,
                    GUID: results[0].GUID,
                    NOME: results[0].NOME,
                    COD_PERFIL_USUARIO: results[0].COD_PERFIL_USUARIO,
                    token: token
                });

              }
         



            return res.status(409).send({ message: 'Usuario já esta logado' })

        }


        return res.status(401).send({ message: 'Falha na autenticação' })

    } catch (error) {
        return res.status(500).send({ message: 'Falha na autenticação' });
    }
};

exports.Logout = async (req, res, next) => {

  try{

     const query = `UPDATE usuario 
                    SET activeJWT               = ?
                    WHERE CODIGO                = ?
                    AND GUID                    = ?`;
               await mysql.execute(query, [
                    null,
                    req.body.CODIGO,
                    req.body.GUID
                ]);

               return res.status(201).send();


    
  } catch (error) {
         return res.status(500).send({ error: error });

    }




}



exports.ForgotPassword = async (req, res, next) => {

    try {

        query = `SELECT * FROM usuario WHERE EMAIL = ?`;
        var results = await mysql.execute(query, [req.body.EMAIL]);

        if (results.length < 1) {
            return res.status(401).send({
                message: 'Falha na autenticação'
            })
        }
        const EMAIL = results[0].EMAIL;
        const NOME = results[0].NOME;

        const token = crypto.randomBytes(20).toString('hex');
        
        const now = new Date();

        now.setHours(now.getHours() + 1 );

        const query2 = `UPDATE usuario 
                    SET passwordResetToken       = ?,
                        passwordResetExpires     = ?
                    WHERE CODIGO                 = ? `;

                mysql.execute(query2, [
                    token,
                    now,
                    results[0].CODIGO

                ]);


           const transporter = nodemailer.createTransport({
            host: SMTP_CONFIG.host,
            port: SMTP_CONFIG.port,
            secure: false,
            auth: {
                user: SMTP_CONFIG.user,
                pass: SMTP_CONFIG.pass
            },
            tls:{
                rejectUnauthorized: false
            }
        });       

  


        transporter.sendMail({
            from: 'Administrador <gestaofacil.app@gmail.com>',
            to: EMAIL,
            subject: 'Recuperação de Senha',
            html:   `<h2> Você esqueceu sua senha ${NOME}?</h2>
                  <p>Não tem problema, utilize esse link para recuperar sua senha: http://gestaofacil.app.br/#/reset-password/${token}/${EMAIL}</p>

            `
          
           
        }, (err) => {
            
            if(err)
                return res.status(400).send({error: ' Cannot send forgot password email'});

            return res.send();


        })

      
    } catch (error) {
        return res.status(404).json({
            message: 'User not found'
        })

    }
};

exports.ResetPassword = async (req, res, next) => {

    try{
         query = `SELECT * FROM usuario WHERE EMAIL = ?`;
        var results = await mysql.execute(query, [req.body.EMAIL]);
        const token = req.body.token;

        if (results.length < 1) {
            return res.status(401).send({
                message: 'Falha na autenticação'
            })
        }
        const EMAIL = results[0].EMAIL;
        const passwordResetToken= results[0].passwordResetToken;
        const passwordResetExpires= results[0].passwordResetExpires;

        if (token !== passwordResetToken)
            return res.status(400).send({error: 'Token invalid'});
     

        const now = new Date();

        if(now > passwordResetExpires)
              return res.status(400).send({error: 'Token expired'});

             const hash = bcrypt.hashSync(req.body.SENHA, 10);

               const query2 = `UPDATE usuario 
                    SET SENHA                   = ?
                    WHERE CODIGO                = ? `;

                mysql.execute(query2, [
                    hash,
                    results[0].CODIGO


                ]);

                res.send();



    } catch (err) {

        res.status(400).send({error: ' Cannot reset password, try again'});

    }

}
exports.ChangePassword = async (req, res, next) => {
    try{

        const query =  ` UPDATE  usuario
                                SET SENHA                     = ?
                                WHERE CODIGO                  = ? `;
        await mysql.execute(query, [
            bcrypt.hashSync(req.body.SENHA, 10),
            req.body.CODIGO
        ]);

        const response = {
            mensagem: ' Senha atualizada com sucesso'
        
        }

       return res.status(202).send (response);

    } catch (error){
        return res.status(500).send({error: error})

    }

};



exports.getUsuarios = async (req, res, next) => {
    try{
        const query = `SELECT user.CODIGO,
            user.COD_PERFIL_USUARIO,
            user.GUID,
            user.NOME,
            user.EMAIL,
            user.SENHA,
            perfil.DESCRICAO as PERFIL_USUARIO
        FROM usuario user
        INNER JOIN perfil_usuario perfil
        on perfil.CODIGO = user.COD_PERFIL_USUARIO
          WHERE user.GUID =  ?;`;
        const result = await mysql.execute(query, [req.params.GUID]);
        const response = {
            usuarios: result.map(usuario => {
                return {
                    CODIGO: usuario.CODIGO,
                    COD_PERFIL_USUARIO: usuario.COD_PERFIL_USUARIO,
                    GUID: usuario.GUID,
                    NOME: usuario.NOME,
                    EMAIL: usuario.EMAIL,
                    SENHA: usuario.SENHA,
                    PERFIL_USUARIO: usuario.PERFIL_USUARIO
                    
                }
            })
        }

        return res.status(200).send(response.usuarios)

    } catch (error){
         return res.status(500).send({ error: error }) 

    }

};

exports.getUmUsuario = async (req, res, next) => 
{
    try{
        const query= `SELECT user.CODIGO,
            user.COD_PERFIL_USUARIO,
            user.GUID,
            user.NOME,
            user.EMAIL,
            user.registrationDate,
            perfil.DESCRICAO as PERFIL_USUARIO
        FROM usuario user
        INNER JOIN perfil_usuario perfil
        on perfil.CODIGO = user.COD_PERFIL_USUARIO
          WHERE user.CODIGO = ?
          AND user.GUID = ?;`;


        const result = await mysql.execute(query, [req.params.CODIGO, req.params.GUID ]);
        if (result.length == 0) {
            return res.status(404).send({
                mensagem: ' Não foi encontrado o contato com este ID'
            })
        }

        const response = {

            usuario: {
                CODIGO: result[0].CODIGO,
                COD_PERFIL_USUARIO: result[0].COD_PERFIL_USUARIO,
                GUID: result[0].GUID,
                NOME: result[0].NOME,
                EMAIL: result[0].EMAIL,
                registrationDate: result[0].registrationDate,
                PERFIL_USUARIO: result[0].PERFIL_USUARIO,
             

            }

        }
        

          return res.status(200).send(response.usuario)
    
   
      

    } catch(error){
        return res.status(500).send({ error: error })

    }

};

exports.postUsuario = async (req, res, next) => {

    try{

        var query = 'SELECT * FROM usuario WHERE EMAIL = ?';
        var result = await mysql.execute(query,[req.body.EMAIL]);

         if(result.length > 0){
             return   res.status(409).send({mensagem:'Usuário já cadastrado'})
            }


          const query2 = 'INSERT INTO usuario (COD_PERFIL_USUARIO, GUID, NOME, EMAIL, SENHA, registrationDate) Values (?, ?, ?, ?, ?, ?)';
          const hash = await bcrypt.hashSync(req.body.SENHA, 10);
          const now = new Date();


         const results = await mysql.execute(query2,[
              req.body.COD_PERFIL_USUARIO,
              req.body.GUID,
              req.body.NOME, 
              req.body.EMAIL,
              hash,
              now

        ]);

     
        return res.status(201).send({
            mensagem: 'Usuário inserido com sucesso',
            id_usuario: results.insertId
        });

    } catch (error){

         return res.status(500).send({ error: error }) 

    }

   

};


exports.updateUsuario = async (req, res, next) => {
    try{
        
        const query =  ` UPDATE  usuario
                            SET COD_PERFIL_USUARIO        = ?,
                                GUID                      = ?,
                                NOME                      = ?,
                                EMAIL                     = ?
                                WHERE CODIGO              = ? `;
        await mysql.execute(query, [
            req.body.COD_PERFIL_USUARIO, 
            req.body.GUID,
            req.body.NOME,
            req.body.EMAIL,
            req.body.CODIGO
        ]);

        const response = {
            mensagem: ' Contato atualizado com sucesso',
            UsuarioAtualizado:{
                CODIGO: req.body.CODIGO,
                GUID: req.body.GUID,
                NOME: req.body.NOME,
                EMAIL: req.body.EMAIL,
    
            }
        }

       return res.status(202).send (response);

    } catch (error){
        return res.status(500).send({error: error})

    }

};

exports.deleteUsuario = async (req, res, next) => {
    try{
        const query =   ` DELETE FROM  usuario WHERE CODIGO = ?`;
        await  mysql.execute(query, [req.params.CODIGO]);
        res.status(202).send({
            mensagem: ' Usuario removido com sucesso',

        });

    } catch(error){

        return res.status(500).send({ error: error });

    }
   
};









