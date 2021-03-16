var express = require("express");
var socket = require("socket.io");
var app = express();

app.use(express.static("public"));
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

var server  = app.listen(port, () => {
    console.log("Listening on port "+ port);
});

var io = socket(server);

io.on("connect", () => {
    console.log("A user arrived");
})

io.on("connection",(socket) => {
    console.log("Socket connection made" + socket.id);
    socket.on("chat", function(data){
        io.sockets.emit("chat",data);
    })
    socket.on("typing", data => {
        socket.broadcast.emit("typing", data);
    })
});

io.on('disconnect', () => {
    console.log("A user disconnected");
})






