var socket = io('http://localhost');
var Hero = {
    level : '1',
    life : '10',
    mana : '100'
};
socket.on('ip', function (data) {
    var ip = data; // Return the ip address of the server
    socket.emit('connected', Hero);
});
function retrait(arr){
    console.log('retrait');
    Hero.life = Hero.life - arr;
    socket.emit('loose', Hero.life);
}
socket.on("gameOver", function(){
    alert('Game Over');
});
