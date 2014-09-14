/*
 * Init Socket
 */
var socket = io('192.168.0.20');

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
        Hero['Strenght'] = $strenght;
        Hero['Stamina'] = $stamina;
        Hero['SpellPower'] = $spellPower;
        Hero['Mana'] = $mana;

        /*
         * Send socket to server & show player panel
         */
        socket.emit('created', Hero);
        $init.className = $init.className + "hide";
        $playerPanel.className = "";
        this._refreshPlayerPanel();
    },
    _refreshPlayerPanel: function(){
        /*
         * Init Vars
         */
        var $HeroName = document.getElementById('pseudo'),
            $HeroHp = document.getElementById('hp');

        $HeroName.innerHTML = Hero['name'] + ' - ' + Hero['class'];
        $HeroHp.innerHTML = Hero['life'] + ' pv';
    }
}


/*
 * Init the game
 */
$('#create').on('click', function(){
    player.init();
});

socket.on("gameOver", function(){
    location.reload();
});
