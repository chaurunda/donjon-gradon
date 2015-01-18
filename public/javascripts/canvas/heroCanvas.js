/***** OBSTACLES *****/
var obstacles = [
    {l:0,t:0,w:156,h:10}, //Top Left
    {l:196,t:0,w:128,h:10}, // Top Right
    {l:0,t:0,w:12,h:288}, // Left Side
    {l:12,t:274,w:16,h:16}, // Bottom left
    {l:68,t:50,w:56,h:34}, // Ash's House
    {l:194,t:50,w:58,h:34}, // Rival's House
    {l:50,t:80,w:16,h:10}, // Ash Panel
    {l:180,t:80,w:16,h:5}, // Rival's Panel
    {l:308,t:0,w:30,h:288}, //Right Side
    {l:134,t:274,w:192,h:10}, //Bottom right
    {l:66,t:224,w:62,h:64}, //Water
    {l:164,t:208,w:90,h:5}, //Oak barier
    {l:164,t:130,w:88,h:58}, //Oak's Lab
    {l:66,t:148,w:60,h:5} //Bourg Palette barier
];
var mapCanvas = document.getElementById('mapCanvas'), mapctx = mapCanvas.getContext('2d');
for(var i = 0, lgth = obstacles.length; i < lgth; i++){
    mapctx.fillStyle = "rgba(100, 100, 100, 1)";
    mapctx.fillRect(obstacles[i].l, obstacles[i].t, obstacles[i].w, obstacles[i].h);
}
/***** END OBSTACLES *****/


var heroCanvas = {
    conf:{
        speed: 4, // movement speed
        animDuration: 250, // cycle duration
        hero : {w: 16, h: 16}, // Hero size
        pos : {x: 20, y: 20} // Hero position
    },
    init: function () {
        this.drawHero();
    },
    drawHero: function () {
        var self = this,
            hero = new Image(),
            canvas = document.getElementById('heroCanvas'),
            ctx = canvas.getContext('2d'),
            mvtKeys = [38,39,40,37], // top, right, bottom, left
            keyIsDown = false,
            switchImage = true, //
            activeKey, initialPosition, animInterval; // to store the current active key, the setTimeout (for inital position) and the setInterval (to animate the hero)

        hero.src = "../../images/character.png";

        hero.onload = function () {
            drawMyImage(hero, 0, 0, self.conf.pos.x, self.conf.pos.y);
            window.addEventListener("keydown", onKeyDown, false);
            window.addEventListener("keyup", onKeyUp, false);
        };

        function checkHit() {
            if(self.conf.pos.x <= 0) self.conf.pos.x = 0;
            else if(self.conf.pos.x >= (canvas.width-self.conf.hero.w)) self.conf.pos.x = canvas.width-self.conf.hero.w;

            if(self.conf.pos.y <= 0) self.conf.pos.y = 0;
            else if(self.conf.pos.y >= (canvas.height-self.conf.hero.h)) self.conf.pos.y = canvas.height-self.conf.hero.h;

            if(obstacles.length){
                for(var i = 0, lgth = obstacles.length; i < lgth; i++){
                    var obstacle = obstacles[i];
                    if(self.conf.pos.y+self.conf.hero.h >= obstacle.t && self.conf.pos.y <= obstacle.t+obstacle.h && self.conf.pos.x+self.conf.hero.w >= obstacle.l && self.conf.pos.x <= obstacle.l+obstacle.w){
                        (activeKey === mvtKeys[0])
                            ? self.conf.pos.y += self.conf.speed
                            : (activeKey === mvtKeys[1])
                                ? self.conf.pos.x -= self.conf.speed
                                : (activeKey === mvtKeys[2])
                                    ? self.conf.pos.y -= self.conf.speed
                                    : self.conf.pos.x += self.conf.speed;
                        break;
                    }
                }
            }
        }

        function onKeyDown(event) {
            if(keyIsDown || !~mvtKeys.indexOf(event.keyCode)) return;

            activeKey = event.keyCode;
            keyIsDown = true;

            if(initialPosition !== undefined) clearTimeout(initialPosition);

            var yVal =
                (activeKey === mvtKeys[0])
                    ? self.conf.hero.h*1
                    : (activeKey === mvtKeys[1])
                        ? self.conf.hero.h*2
                        : (activeKey === mvtKeys[2])
                            ? self.conf.hero.h*0
                            : self.conf.hero.h*3;

            function moveHero () {
                (activeKey === mvtKeys[0])
                    ? self.conf.pos.y -= self.conf.speed
                    : (activeKey === mvtKeys[1])
                        ? self.conf.pos.x += self.conf.speed
                        : (activeKey === mvtKeys[2])
                            ? self.conf.pos.y += self.conf.speed
                            : self.conf.pos.x -= self.conf.speed;

                checkHit();
                drawMyImage(hero, 0, yVal, self.conf.pos.x, self.conf.pos.y);
            }

            moveHero();
            animInterval = setInterval(moveHero, self.conf.animDuration);
        }

        function onKeyUp(event) {
            if(event.keyCode !== activeKey) return;

            keyIsDown = false;

            clearInterval(animInterval);

            initialPosition = setTimeout(function(){
                drawMyImage(hero, 0, 0, self.conf.pos.x, self.conf.pos.y);
            }, 50);
        }

        function drawMyImage(image, x, y, posX, posY) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, (switchImage) ? x : x+self.conf.hero.w, y, self.conf.hero.w, self.conf.hero.h, posX, posY, self.conf.hero.w, self.conf.hero.h);
            switchImage = !switchImage;
        }

    }
}
