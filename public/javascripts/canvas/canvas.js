var smiley = new Image(),
    ts = new Tileset("tile.png"),
    map = new Map("map");

smiley.src = "http://www.siteduzero.com/Templates/images/smilies/heureux.png";

window.onload = function () {
    var canvas = document.getElementById('screen');
    if (canvas) {
        var ctx = canvas.getContext('2d'),
            image = {
                x: 10,
                y: 10
            };

        /* Draw Full rectangle */
        //ctx.fillStyle = 'blue';
        //ctx.fillRect(10, Math.LN100, 100, 50);

        /* Draw Border of rectangle */
        //ctx.strokeStyle = 'red';
        //ctx.strokeRect(75, 75, 50, 50);

        /* Draw Image */

        /* Draw tileset */
        //ts.drawTile(1, ctx, 10, 10);
        //ts.drawTile(3, ctx, 42, 10);
        //ts.drawTile(6, ctx, 90, 10);
        //ts.drawTile(7, ctx, 130, 10);

        /* Draw Json Map */
        // canvas.width  = map.getWidth() * 32;
        // canvas.height = map.getHeight() * 32;


        ctx.drawImage(smiley, image.x, image.y);

        //map.drawMap(ctx);

        window.addEventListener("keyup", function (e) {
            switch (e.keyCode) {
            case 38:
                clearScreen(ctx);
                image.y = image.y - 3;
                ctx.drawImage(smiley, image.x, image.y);
                break;
            case 40:
                clearScreen(ctx);
                image.y = image.y + 3;
                ctx.drawImage(smiley, image.x, image.y);
                break;
            case 37:
                clearScreen(ctx);
                image.x = image.x - 3;
                ctx.drawImage(smiley, image.x, image.y);
                break;
            case 39:
                clearScreen(ctx);
                image.x = image.x + 3;
                ctx.drawImage(smiley, image.x, image.y);
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