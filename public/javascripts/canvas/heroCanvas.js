var heroCanvas = {
    init : function(){
        this.drawHero();
    },
    drawHero : function(){
        var hero = new Image(),
            canvas = document.getElementById('heroCanvas'),
            ctx = canvas.getContext('2d'),
            requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            window.requestAnimationFrame = requestAnimationFrame;
        window.addEventListener("keydown", onKeyDown, false);
        window.addEventListener("keyup", onKeyUp, false);
        function onKeyDown(event) {
            var keyCode = event.keyCode;
            console.log(keyCode);
            switch (keyCode) {
                case 37: //Left
                    keyLeft = true;
                    break;
                case 38: //Top
                    keyTop = true;
                    break;
                case 39: //Right
                    keyRight = true;
                    break;
                case 40: //Bottom
                    keyBottom = true;
                    break;
            }
        }

        function onKeyUp(event) {
            var keyCode = event.keyCode;
            switch (keyCode) {
                case 37: //Left
                    keyLeft = false;
                    break;
                case 38: //Top
                    keyTop = false;
                    break;
                case 39: //Right
                    keyRight = false;
                    break;
                case 40: //Bottom
                    keyBottom = false;
                    break;
            }
        }

        //neccessary variables
        var tickX = 10,
            tickY = 10,
            keyLeft = false,
            keyTop = false,
            keyRight = false,
            keyBottom = false;
        //main animation function
        function drawStuff() {
            window.requestAnimationFrame(drawStuff);
            hero.src = "/images/character.png";
            hero.onload = function(){
                console.log("image loaded");
                   ctx.drawImage(hero, 0, 0, 16, 16, tickX, tickY, 16, 16);
            };
            if (keyRight == true) {
                tickX += 1;
                ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
                ctx.drawImage(hero, 0, 32, 16, 16, tickX, tickY, 16, 16);
            }
            if (keyBottom == true) {
                tickY += 1;
                ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
                ctx.drawImage(hero, 0, 0, 16, 16, tickX, tickY, 16, 16);
            }
            if (keyTop == true) {
                tickY--;
                ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
                ctx.drawImage(hero, 0, 16, 16, 16, tickX, tickY, 16, 16);
            }
            if (keyLeft == true) {
                tickX--;
                ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
                ctx.drawImage(hero, 0, 48, 16, 16, tickX, tickY, 16, 16);
            }
        }
        window.requestAnimationFrame(drawStuff);
    }
}

