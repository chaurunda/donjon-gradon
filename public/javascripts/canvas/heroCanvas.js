var heroCanvas = {
    conf:{
        speed: 3, // movement speed
        animDuration: 300, // cycle duration
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
            switchImage = true,
            activeKey, initialPosition, animInterval; // to store the current active key, the setTimeout (for inital position) and the setInterval (to animate the hero)

        hero.src = "../../images/character.png";

        hero.onload = function () {
            drawMyImage(hero, 0, 0, self.conf.pos.x, self.conf.pos.y);
            window.addEventListener("keydown", onKeyDown, false);
            window.addEventListener("keyup", onKeyUp, false);
        };

        function onKeyDown(event) {
            if(keyIsDown || !~mvtKeys.indexOf(event.keyCode)) return;

            activeKey = event.keyCode;
            keyIsDown = true;

            if(initialPosition !== undefined) clearTimeout(initialPosition);

            var yVal =
                (activeKey === mvtKeys[0])
                    ? 16
                    : (activeKey === mvtKeys[1])
                        ? 32
                        : (activeKey === mvtKeys[2])
                            ? 0
                            : 48;

            function moveHero () {
                (activeKey === mvtKeys[0])
                    ? self.conf.pos.y -= self.conf.speed
                    : (activeKey === mvtKeys[1])
                        ? self.conf.pos.x += self.conf.speed
                        : (activeKey === mvtKeys[2])
                            ? self.conf.pos.y += self.conf.speed
                            : self.conf.pos.x -= self.conf.speed;

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
            ctx.drawImage(image, (switchImage) ? x : x+16, y, 16, 16, posX, posY, 16, 16);
            switchImage = !switchImage;
        }

    }
}