var hero = new Image();
hero.src = "/images/character.png";

window.onload = function () {
    var canvas = document.getElementById('screen');
    if (canvas) {
        var ctx = canvas.getContext('2d'),
            positionImage = {
                x: 10,
                y: 10
            };
        
        ctx.drawImage(hero, 0, 0, 16, 16, positionImage.x, positionImage.y, 16, 16);

        //map.drawMap(ctx);

        window.addEventListener("keyup", function (e) {
            switch (e.keyCode) {
            case 38: // top
                clearScreen(ctx);
                positionImage.y = positionImage.y - 3;
                ctx.drawImage(hero, 16, 0, 16, 16, positionImage.x, positionImage.y, 16, 16);
                break;
            case 40: // bottom
                clearScreen(ctx);
                positionImage.y = positionImage.y + 3;
                ctx.drawImage(hero, 0, 0, 16, 16, positionImage.x, positionImage.y, 16, 16);
                break;
            case 37: // left
                clearScreen(ctx);
                positionImage.x = positionImage.x - 3;
                ctx.drawImage(hero, 32, 0, 16, 16, positionImage.x, positionImage.y, 16, 16);
                break;
            case 39: //right
                clearScreen(ctx);
                ctx.drawImage(hero, 96, 0, 16, 16, positionImage.x, positionImage.y, 16, 16);
                positionImage.x = positionImage.x + 3;
                break;
            }
        }, false);
    }
};

function clearScreen(ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 300, 150);
};

function getKeyCode(e) {
    console.log(e.keyCode);
};