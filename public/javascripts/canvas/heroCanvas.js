var heroCanvas = {
    init: function () {
        this.drawHero();
    },
    drawHero: function () {
        var hero = new Image(),
            canvas = document.getElementById('heroCanvas'),
            ctx = canvas.getContext('2d'),
            requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
            keyIsDown = false,
            animInterval,
            timeInterval = 150,
            mvt = 3,
            tickX = 10,
            tickY = 10,
            keyLeft = false,
            keyTop = false,
            keyRight = false,
            keyBottom = false,
            switchImage = true;

        window.requestAnimationFrame = requestAnimationFrame;

        window.addEventListener("keydown", onKeyDown, false);
        window.addEventListener("keyup", onKeyUp, false);

        function onKeyDown(event) {
            if (keyIsDown) return;
            console.log('Key Down');
            keyIsDown = true;
            var keyCode = event.keyCode,
                yVal = 0;
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

            if (keyRight == true) {
                yVal = 32;
            } else if (keyBottom == true) {
                yVal = 0;
            } else if (keyTop == true) {
                yVal = 16;
            } else if (keyLeft == true) {
                yVal = 48;
            }

            animInterval = setInterval(function () {
                if (keyRight == true) {
                    tickX += mvt;
                } else if (keyBottom == true) {
                    tickY += mvt;
                } else if (keyTop == true) {
                    tickY -= mvt;
                } else if (keyLeft == true) {
                    tickX -= mvt;
                }
                drawMyImage(hero, 0, yVal, tickX, tickY);
            }, timeInterval);

        }

        function onKeyUp(event) {
            console.log('Key Up');
            keyIsDown = false;
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
            clearInterval(animInterval);
        }


        function drawMyImage(image, x, y, tickX, tickY) {
            if (switchImage) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, x, y, 16, 16, tickX, tickY, 16, 16);
                switchImage = false;
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, x + 16, y, 16, 16, tickX, tickY, 16, 16);
                switchImage = true;
            }
        }

        hero.src = "https://raw.githubusercontent.com/arnaudhuc/donjon-gradon/master/public/images/character.png";
        hero.onload = function () {
            console.log("image loaded");
            drawMyImage(hero, 0, 0, tickX, tickY);
        };
    }
}