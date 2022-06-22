const jwt = require('jsonwebtoken');
const mysql = require('../mysql');



module.exports = async(req, res , next) =>{
    try{

        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token,  'superScretthing');
        req.usuario = decode;

        const userRole = req.usuario;
        //console.log(userRole);

        const query = `SELECT *
	         FROM usuario
	         WHERE CODIGO = ?
	         AND GUID = ?`;

        var results = await mysql.execute(query, [userRole.CODIGO, userRole.GUID]);
        //console.log(results[0].activeJWT);

        if(token == (results[0].activeJWT)){
        	next()
        }else {

        	return res.status(409).json("Token foi revogado pelo usuário")
        }

      

        

    }
    catch (error){
        res.status(401).send({mensagem: 'Falha na autenticação'})
    


    }
}



// exports.opcional = (req, res , next) =>{
//     try{
//         const token = req.headers.authorization.split(' ')[1];
//         const decode = jwt.verify(token,  process.env.JWT_KEY);
//         req.usuario = decode;
//         next();

//     }
//     catch (error){
//         next();
//     }
// }

