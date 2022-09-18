const Role = require('../models/roles');
const Usario = require('../models/usuarios');

const esRolValido = async(rol = '') => {

    const existeRol = await Role.findOne({rol});

    if( !existeRol ) {

        throw new Error(`El rol => ${rol} <= no está registrado en la BD`)

    };

};

const emailExiste = async(correo = '') => {

    const existEamil = await Usario.findOne({ correo });

    if(existEamil) {

        throw new Error(`El correo => ${correo} <= ya está registrado en la BD`);

    };

};

const usuarioExist = async(id = '') => {
    

    const existUsuario = await Usario.findById( id );
   
    if(!existUsuario) {

        throw new Error(`El usuario con el id ==> ${id} <== No existe.`);

    };

};

module.exports = {
    esRolValido,
    emailExiste,
    usuarioExist
};