function bootstrap() {
  corredores = [];
  var race1K;
  urlRunner = "https://fastspeedster.herokuapp.com/api/runners";
  urlPosiciones="https://fastspeedster.herokuapp.com/api/positions";
  urlCamaras= "https://fastspeedster.herokuapp.com/api/webcams/42";
  urlPistas="https://fastspeedster.herokuapp.com/api/tracks";

var inicializar = function(race){
    traerObjectoJson(urlPistas, agregarPistas,map);
    traerObjectoJson(urlCamaras, agregarCamaras,map);
    console.log("Competidores: ");
    traerObjectoJson(urlRunner, agregarCorredores,race1K);
}

traerObjectoJson = function(url,accion,race) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var myObj = JSON.parse(this.responseText);
          accion(myObj,race);
      }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

    // Ubicación de la UNGS.
    var ungsLocation = [-34.5221554, -58.7000067];

    // Creación del componente mapa de Leaflet.
    var map = L.map('mapid').setView(ungsLocation, 16);

    // Agregamos los Layers de OpenStreetMap.
    var baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Agregamos el control para seleccionar Layers al mapa
    var layersControl = L.control.layers({
        "Base": baseLayer
    });
    layersControl.addTo(map);
    // hack:
    map.layersControl = layersControl;

    race1K = new Race("1K", map);

    inicializar(race1K);

}

$(bootstrap);
