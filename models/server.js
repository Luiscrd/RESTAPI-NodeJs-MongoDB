const express = require('express');
var cors = require('cors');
const { dbConection } = require('../database/confij');

class Server {

    constructor(ruta = '/') {

        this.app = express();
        this.port = process.env.PORT;
        this.rutaRaiz = ruta;
        this.usuariosPath = '/api/usuarios';
        // Conectar a la base de datos
        this.conectarDb();
        // Middlewares
        this.middelwares();
        // Rutas de la aplicación
        this.routes();

    }

    async conectarDb() {

        await dbConection();

    }

    middelwares() {

        // CORS
        this.app.use(cors());
        // Lectura y trasformación del body
        this.app.use(express.json())
        // Directorio Público
        this.app.use(express.static('public'));

    }

    routes() {

        this.app.use('/api/usuarios', require('../routes/user'));

        this.app.get('/api', (req, res) => {

            res.sendFile(this.rutaRaiz + '/public/REST.html');

        });

        this.app.get('*', (req, res) => {

            res.status(404).sendFile(this.rutaRaiz + '/public/404.html')
        });

        this.app.put('*', (req, res) => {

            res.status(404).sendFile(this.rutaRaiz + '/public/404.html')
        });

        this.app.post('*', (req, res) => {

            res.status(404).sendFile(this.rutaRaiz + '/public/404.html')
        });

        this.app.patch('*', (req, res) => {

            res.status(404).sendFile(this.rutaRaiz + '/public/404.html')
        });

        this.app.delete('*', (req, res) => {

            res.status(404).sendFile(this.rutaRaiz + '/public/404.html')
        });


    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en: http://localhost:${this.port}`);
        })

    }
};

module.exports = Server;