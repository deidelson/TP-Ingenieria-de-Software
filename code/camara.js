
var Camara = function(id, coordenada, frecuencia) {
  this.id=id;
  this.coordenada=coordenada;
  this.frecuencia=frecuencia;
}

agregarCamaras=function(objetoCamaras, mapa){
    var camaras=objetoCamaras.webcams;
    for(var i=0; i<camaras.length; i++){
      var camaraLayer = L.featureGroup().bindPopup("Id: "+camaras[i].id+" frecuencia: "+camaras[i].frecuency)
      .on('click', function(){})
      .addTo(mapa);
      var newPosition=camaras[i].coordinate;

      var camaraIcon = L.icon({
          iconUrl: 'camara1.png',
          iconSize:     [25, 25] // size of the icon
      });
      var marker = L.marker(newPosition, {icon: camaraIcon});
      camaraLayer.addLayer(marker);
      }
}
