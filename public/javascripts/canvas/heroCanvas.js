var hero = new Image();
hero.src = "/images/character.png";

window.onload = function () {
    var canvas = document.getElementById('heroCanvas');
    if (canvas) {
        canvas.width = 160;
        canvas.height = 144;
        var ctx = canvas.getContext('2d'),
            positionImage = {
                x: canvas.width / 2,
                y: canvas.height / 2
            };
        ctx.drawImage(hero, 0, 0, 16, 16, positionImage.x, positionImage.y, 16, 16);
        window.addEventListener("keydown", function (e) {
            switch (e.keyCode) {
            case 38: // top
                ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
                positionImage.y = positionImage.y - 3;
                ctx.drawImage(hero, 0, 16, 16, 16, positionImage.x, positionImage.y, 16, 16);
                break;
            case 40: // bottom
                ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
                positionImage.y = positionImage.y + 3;
                ctx.drawImage(hero, 0, 0, 16, 16, positionImage.x, positionImage.y, 16, 16);
                break;
            case 37: // left
                ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
                positionImage.x = positionImage.x - 3;
                ctx.drawImage(hero, 0, 48, 16, 16, positionImage.x, positionImage.y, 16, 16);
                break;
            case 39: //right
                ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
                ctx.drawImage(hero, 0, 32, 16, 16, positionImage.x, positionImage.y, 16, 16);
                positionImage.x = positionImage.x + 3;
                break;
            }
        }, false);
    }
};

