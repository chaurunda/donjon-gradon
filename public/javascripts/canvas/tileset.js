function Tileset(url) {
  // Chargement de l'image dans l'attribut image
  this.image = new Image();
  this.image.tilesetRef = this;
  this.image.onload = function() {
    if(!this.complete){
      throw new Error("Erreur de chargement du tileset nommé \"" + url + "\".");
    }
    // Largeur du tileset en tiles
    this.tilesetRef.largeur = this.width / 32;
  }
  this.image.src = "/tilesets/" + url;
}

// Méthode de dessin du tile numéro "numero" dans le contexte 2D "context" aux coordonnées x et y
Tileset.prototype.drawTile = function(numero, context, xDestination, yDestination) {
  //Coordonnée en x
  var xSourceTiles = numero % this.largeur;
  if(xSourceTiles == 0) xSourceEnTiles = this.largeur;
  //Coordonnée en y
  var ySourceTiles = Math.ceil(numero / this.largeur);

  var xSource = (xSourceTiles - 1) * 32,
      ySource = (ySourceTiles - 1) * 32;

  // Dessinons l'image
  context.drawImage(this.image, xSource, ySource, 32, 32, xDestination, yDestination, 32, 32);
}
