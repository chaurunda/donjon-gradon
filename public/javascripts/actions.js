function retrait(arr){
    console.log('retrait');
    Hero.life = Hero.life - arr;
    socket.emit('loose', Hero.life);
    donjon._refreshPlayerPanel();
}
