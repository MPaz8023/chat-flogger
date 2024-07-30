// import { text } from "express";

console.log("Hola, si funciona");

const socket = io();

//creamos una variable para guardar al usuario
let user;

const chatBox = document.getElementById("chatBox");

//usamos sweet alert para el mensaje de bienvenida
//fire nos permite configurar el alerta
Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingresa un usuario para identificarte en el chat",
    inputValidator: (value) => {
        return !value && "necesitas escribir un nombre para continuar"
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
})

//desde el chatbox capturamos el mensaje y se lo enviamos al back
chatBox.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        if(chatBox.value.trim().length > 0)
            socket.emit("message", {user: user, message: chatBox.value});
        chatBox.value = "";
    }
})

//listener de mensajes

socket.on("messagesLogs", data => {
    const log = document.getElementById("messagesLogs");
    let messages = "";

    data.forEach(message => {
      messages = messages + ` ${message.user} dice: ${message.message} <br>`
    })

    log.innerHTML = messages;

})
