const { validarCampos } = require('./validar-campo');
const { validarJWT } = require('./validar-jwt');
const { esAdminRole, tieneRol } = require('./validar-roles');

module.exports = {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRol
}