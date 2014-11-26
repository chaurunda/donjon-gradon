var smiley = new Image(),
    ts = new Tileset("tile.png"),
    map = new Map("map");

smiley.src = "http://www.siteduzero.com/Templates/images/smilies/heureux.png";

window.onload = function(){
  var canvas = document.getElementById('screen');
  if(canvas){
    var ctx = canvas.getContext('2d');

    /* Draw Full rectangle */
    //ctx.fillStyle = 'blue';
    //ctx.fillRect(10, Math.LN100, 100, 50);

    /* Draw Border of rectangle */
    //ctx.strokeStyle = 'red';
    //ctx.strokeRect(75, 75, 50, 50);

    /* Draw Image */
    //ctx.drawImage(smiley, 200, 10);
    //ctx.drawImage(smiley, 200, 30, 100, 50);
    //ctx.drawImage(smiley, 0, 0, 10, 19, 200, 100, 10, 19);

    /* Draw tileset */
    //ts.drawTile(1, ctx, 10, 10);
    //ts.drawTile(3, ctx, 42, 10);
    //ts.drawTile(6, ctx, 90, 10);
    //ts.drawTile(7, ctx, 130, 10);

    /* Draw Json Map */
    canvas.width  = map.getWidth() * 32;
    canvas.height = map.getHeight() * 32;

    map.drawMap(ctx);
  }
}
