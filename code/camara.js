
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
          //shadowUrl: 'leaf-shadow.png',

          iconSize:     [35, 35], // size of the icon
        /*  shadowSize:   [15, 20], // size of the shadow
          iconAnchor:   [15, 20], // point of the icon which will correspond to marker's location
          shadowAnchor: [4, 62],  // the same for the shadow
          popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor */
      });


      var marker = L.marker(newPosition, {icon: camaraIcon});

      camaraLayer.addLayer(marker);
      }
}
