var mapCanvas = {
    init: function () {
        this.drawMap();
    },
    drawMap: function () {
        // Define variables
        var tilesetImage = new Image();
        tilesetImage.src = '../../tilesets/pokemon.png';
        tilesetImage.onload = drawImage;

        var canvas = document.getElementById('mapCanvas');
        var ctx = canvas.getContext('2d');
        var tileSize = 16; // The size of a tile (32x32)
        var rowTileCount = 20; // The number of tiles in a row of our background
        var colTileCount = 32; // The number of tiles in a column of our background
        var imageNumTiles = 38; // The number of tiles per row in the tileset image
        var xhr = getXMLHttpRequest();
        // loading file via XMLHTTPRequest
        xhr.open("GET", '/maps/start.json', false);
        xhr.send(null);
        if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 en local
            throw new Error("Impossible de charger la carte nommée \"start\" (code HTTP : " + xhr.status + ").");
        var mapJsonData = xhr.responseText;
        var mapData = JSON.parse(mapJsonData);
        // The tileset arrays
        var ground = mapData.map;
        console.log(ground);
        function drawImage() {
            // Draw the arrays to the canvas
            for (var r = 0; r < rowTileCount; r++) {
                for (var c = 0; c < colTileCount; c++) {
                    var tile = ground[r][c];
                    var tileRow = (tile / imageNumTiles) | 0; // Bitwise OR operation
                    var tileCol = (tile % imageNumTiles) | 0;
                    ctx.drawImage(tilesetImage, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (c * tileSize), (r * tileSize), tileSize, tileSize);
                }
            }
        }
    }
}
