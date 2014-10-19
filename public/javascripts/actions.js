/*
 * All the action will be seen on the browser client
 */
var game = {
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

