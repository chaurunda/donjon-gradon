var socket = io('192.168.0.20');
var Hero = {
    level : '1',
    life : '10',
    mana : '100'
};
function retrait(arr){
    console.log('retrait');
    Hero.life = Hero.life - arr;
    socket.emit('loose', Hero.life);
    $('#pseudo').html('<strong>'+ Hero['pseudo']+'</strong> Level :'+Hero['level']);
    $('#hp').html(Hero['life']+' hp');
    $('#mana').html(Hero['mana']+' mp');
}
$('#create').on('click', function(){
    Hero['pseudo'] = $('#init').find('input').val();
    socket.emit('connected', Hero);
    $('#init').hide();
    $('#perso').show()
    $('#pseudo').html('<strong>'+ Hero['pseudo']+'</strong> Level :'+Hero['level']);
    $('#hp').html(Hero['life']+' hp');
    $('#mana').html(Hero['mana']+' mp');
});
socket.on('ip', function (data) {
    var ip = data; // Return the ip address of the server
});

socket.on("gameOver", function(){
    location.reload();
});
