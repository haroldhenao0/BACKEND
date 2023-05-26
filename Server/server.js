const express = require('express')
require('dotenv').config()
const{ dbConnection } = require('../database/config')
const cors = require('cors');
const{ socketController } = require('../Sockets/controller');

class Server {
    constructor(){
        this.headers = {
            cors: {
                origin: 'HTTP://127.0.0.1:5173',
                methods: ["GET", "POST"]
            }
        }

        // Crear Express App
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server, this.headers)

        this.paths = {
            auth: '/api/auth',
            task: '/api/task'
        }

        this.connectToDB();
        this.addMiddlewares();
        this.setRoutes();

        //Sockets
        this.sockets()
    }

    //Base Datos
    async connectToDB(){
        await dbConnection();
    }

    addMiddlewares(){
        //CORS
        this.app.use(cors(this.headers))

        //Lectura y parseo del body
        this.app.use(express.json());

        //public folder
        this.app.use(express.static('public'))
    }


    setRoutes(){

    }

    sockets(){
        this.io.on('connection', socket => socketController(socket, this.io))
    }

    listen(){
        //Escuchar en puerto 4000
        this.server.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto', process.env.PORT)
        })
    }
}

module.exports = Server;