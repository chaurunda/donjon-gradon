/*
 * All the action will be seen on the browser client
 */
var browser = {
    /*
     * @param : string
     * Remove @param life to the player
     */
    retrait : function(arr){
        Hero.life = Hero.life - arr;
        socket.emit('loose', Hero.life);
        player.refreshPlayerPanel();
    }
};
/*
 * Show to all player the status of the other members in the team
 */


socket.on('newPlayer', function(hero){
    var team = $('#team'),
        player = team.find('.'+hero.name+'');
    if(player.length){
        player.html('<p class="name">' +hero.name+ '</p><p class="hp">' +hero.life+ ' pv</p><p class="mana">' +hero.mana+ ' mp</p><p class="xp">' +hero.xp+ ' / ' +hero.xpMax+ '</p>');
    } else{
        team.html(team.html() + '<div class="player ' +hero.name+ '"><p class="name">' +hero.name+ '</p><p class="hp">' +hero.life+ ' pv</p><p class="mana">' +hero.mana+ ' mp</p><p class="xp">' +hero.xp+ ' / ' +hero.xpMax+ '</p></div>');
    }
});
