const jwt = require('jsonwebtoken');

// req.usuario.COD_PERFIL_USUARIO  1 == ADMIN
// req.usuario.COD_PERFIL_USUARIO  2 == USER

const role = (permissions) => {
	return (req, res, next) =>{
		const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token,  'superScretthing');
        req.usuario = decode;
        //console.log(req.usuario.COD_PERFIL_USUARIO);
        const userRole= req.usuario;

        if(userRole && permissions.includes(userRole.COD_PERFIL_USUARIO)){
        	next()
        } else {

        	return res.status(401).json("You don't have permission!")
        }



	}
}



const roleUser = (req, res, next) =>{
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token,  'superScretthing');
        req.usuario = decode;
        //console.log(req.usuario.COD_PERFIL_USUARIO);

        if((req.params.CODIGO ==  req.usuario.CODIGO) || (req.usuario.COD_PERFIL_USUARIO == 1) ){
                next()
       
        } else {

                return res.status(401).json("You don't have access to this user!")
        }



   }

module.exports = {role, roleUser};