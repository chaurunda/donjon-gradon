/***** OBSTACLES *****/
var obstacles = [
    {l:50,t:50,w:10,h:10},
    {l:150,t:70,w:20,h:20},
    {l:100,t:100,w:30,h:5}
];
var mapCanvas = document.getElementById('mapCanvas'), mapctx = mapCanvas.getContext('2d');
for(var i = 0, lgth = obstacles.length; i < lgth; i++){
    mapctx.fillStyle = "rgba(100, 100, 100, 1)";
    mapctx.fillRect(obstacles[i].l, obstacles[i].t, obstacles[i].w, obstacles[i].h);
}
/***** END OBSTACLES *****/


var heroCanvas = {
    conf:{
        speed: 5, // movement speed
        animDuration: 250, // cycle duration
        hero : {w: 16, h: 16}, // Hero size
        pos : {x: 10, y: 10} // Hero position
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