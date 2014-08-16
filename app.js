var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
var port = 1810;
var os = require('os');
var ifaces = os.networkInterfaces();
var test = "192.168.";

/*
  Return result : LocalIP of the serveur
  */
for (var dev in ifaces) {
    for(var details in ifaces[dev]){
        var detail = ifaces[dev][details]
        if (detail.family=='IPv4' && detail.address.substr(0, test.length) == test) {
            var result = detail.address;
            console.log(result);
            break;
        }
    }
}

app.listen(port);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
              function (err, data) {
                if (err) {
                  res.writeHead(500);
                  return res.end('Error loading index.html');
              }

              res.writeHead(200);
              res.end(data);
          });
}
console.log('Serveur launch on port '+ port);

io.on('connection', function (socket) {
    socket.emit('ip', result);//Send Ip address for client, to allow them to connect to the server socket
    socket.on('connected', function(data){
        socket.hero = data ;
        console.log(socket.id+':',socket.hero);
    })
    socket.on('loose', function(data){
        socket.hero.life = data;
    })
    if(socket.Hero.life === 0){
        socket.emmit('gameOver', true);
    }


});
