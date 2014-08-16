/*
* All the javascript stuff here

*/

    var socket = io('http://localhost');
    console.log(socket);
    socket.on('ip', function (data) {
        var ip = data; // Return the ip address of the server
        socket.emit('connected');
    });

