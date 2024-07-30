/**CHAT COMUNITARIO FOTOLOG - 2004 
 * instalar nodemon (npm i nodemon -D)
 * npm i express express-handlebars socker.io
 */

import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
const app = express();
const PUERTO = 8080;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public"));

//configuramos express-handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//ruta
app.get("/", (req, res) => {
    res.render("index");
})

//listen
const httpServer = app.listen(PUERTO, () =>{
    console.log(`Escuchando en el Puerto: ${PUERTO}`);
})

const io = new Server(httpServer);

//me voy a crear un array que guarde el historial de mensajes
let messages = [];

io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado!!");

    socket.on("message", data => {
        messages.push(data);

        //emitimos mensaje para el cliente con el array de datos
        io.emit("messagesLogs", messages);
    })
})

