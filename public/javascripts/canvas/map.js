function Map(name){
  // Création de l'objet XmlHttpRequest
  var xhr = getXMLHttpRequest();

  // Chargement du fichier
  xhr.open("GET", '/maps/' + name + '.json', false);
  xhr.send(null);
  if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)){ // Code == 0 en local
    throw new Error("Impossible de charger la carte nommée \"" + name + "\" (code HTTP : " + xhr.status + ").");
  }
  var mapJsonData = xhr.responseText;

  // Analyse des données
  var mapData = JSON.parse(mapJsonData);

  // Init tileset & map
  this.tileset = new Tileset(mapData.tileset);
  this.map = mapData.map;
}

// Pour récupérer la taille (en tiles) de la carte
Map.prototype.getHeight = function() {
  return this.map.length;
}
Map.prototype.getWidth = function() {
  return this.map[0].length;
}

Map.prototype.drawMap = function(context) {
  for(var i = 0, l = this.map.length ; i < l ; i++) {
    var line = this.map[i];
    var y = i * 32;
    for(var j = 0, k = line.length ; j < k ; j++) {
      this.tileset.drawTile(line[j], context, j * 32, y);
    }
  }
}
