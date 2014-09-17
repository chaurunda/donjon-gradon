/*
 * Everything about the player is here
 * _heroCreate : Will create the new player. Is waiting for the name and the class of the hero.
 * _initClassHero : Will add to the hero all of the beginning stats
 * refreshPlayerPanel : Will refresh the panel stats of the player
 */

/*
 * Init Socket
 */
var ip = $('#hiddenIp').val().trim(),
    socket = io(ip);

socket.on('ip', function (data) {
    var ip = data; // Return the ip address of the server
});

var Hero = {},
player = {
    init: function(){
       this._heroCreate();
    },

    _heroCreate: function(){
        /*
         * Init Vars
         */
        var $heroName = document.getElementById('name').value,
            $heroClass = document.getElementById('class').value;
        /*
         * Init Hero
         */
        Hero['level'] = '1';
        Hero['life'] = '100';
        Hero['class'] = $heroClass;
        Hero['name'] = $heroName;
        Hero['xp'] = '0';
        Hero['xpMax'] = '100';
        this._initClassHero($heroClass);
    },
    _initClassHero: function(classes){
        /*
         * Init Vars
         */
        $init = document.getElementById('init'),
        $playerPanel = document.getElementById('perso');

        /*
         * Set First stats
         */
        if(classes == "warrior"){
            $strenght = '20';
            $stamina = '10';
            $spellPower = '0';
            $mana = '0';
        } else if(classes == "magus"){
            $strenght = '0';
            $stamina = '0';
            $spellPower = '10';
            $mana = '20';
        } else {
            $strenght = '0';
            $stamina = '0';
            $spellPower = '0';
            $mana = '0';
        }
        Hero['strenght'] = $strenght;
        Hero['stamina'] = $stamina;
        Hero['spellPower'] = $spellPower;
        Hero['mana'] = $mana;

        /*
         * Send socket to server & show player panel
         */
        socket.emit('created', Hero);
        $init.className = $init.className + "hide";
        $playerPanel.className = "";
        this.refreshPlayerPanel();
    },
    refreshPlayerPanel: function(){
        /*
         * Init Vars
         */
        var $HeroName = document.getElementById('pseudo'),
            $HeroHp = document.getElementById('hp');
        /*
         * Refresh the panel stats of the player
         */
        $HeroName.innerHTML = Hero['name'] + ' - ' + Hero['class'];
        $HeroHp.innerHTML = Hero['life'] + ' pv';
        /*
         * Send Hero status to the other players
         */
        socket.emit('statusHero', Hero);
    }
}


socket.on("gameOver", function(){
    location.reload();
});
