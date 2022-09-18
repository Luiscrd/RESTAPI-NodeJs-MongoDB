const { Router, response, request } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth-controller');
const { validarCampos } = require('../middlewares/validar-campo');

const router = Router();

router.post('/login', [
    check('correo', 'El correo es Obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'La constraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'id_token es necesareio').not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;