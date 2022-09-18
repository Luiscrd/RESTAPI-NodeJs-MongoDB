const { response, request } = require("express");
const bcrypt = require('bcryptjs');
const Usario = require('../models/usuarios');
const generarJWT = require("../helpers/generar-jwt");

const login = async(req = request, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el email existe y si el usuario etá activo
        const usuario = await Usario.findOne({ correo });

        if ( !usuario || !usuario.stado ) {
            return res.status(400).json({

                msg: `Usuario o contraseña no validos`,
        
            });
        };

        // Verificar la contraseña
        const validarPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validarPassword ) {
            return res.status(400).json({

                msg: `Usuario o contraseña no validos`,
        
            });
        };

        // Generar JWT
        const token = await generarJWT( usuario.id );

        res.status(202).json({

            msg: `Logueado Correctamente`,
            usuario,
            token
    
        });

    } catch(err) {

        console.warn(err);

        res.status(500).json({

            msg: `Contacte con el administrador`,
    
        });

    }

};

module.exports = {
    login
}