const express = require('express');
const router = express.Router();
const auth = require('../middleware/login');
const {role,roleUser} = require('../middleware/authorization');

const UsuariosController = require('../controllers/usuarios-controller');


router.post('/cadastro', UsuariosController.cadastrarUsuario);

router.post('/login', UsuariosController.Login);

router.post('/logout', UsuariosController.Logout);

router.put('/forgot-password', UsuariosController.ForgotPassword);

router.put('/reset-password/', UsuariosController.ResetPassword);

router.put('/change-password/',auth, UsuariosController.ChangePassword);

router.get('/:GUID',auth,role([1]), UsuariosController.getUsuarios);

router.get('/:CODIGO/:GUID',auth,roleUser, UsuariosController.getUmUsuario);

router.post('/',auth, UsuariosController.postUsuario );

router.patch('/',auth, UsuariosController.updateUsuario);

router.delete('/:CODIGO',auth, UsuariosController.deleteUsuario);


module.exports = router;