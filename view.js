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

traerObjectoJson = function(url,callback,objetoaInyectar) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //parseo
          var myObj = JSON.parse(this.responseText);
          callback(myObj,objetoaInyectar);
      }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

    // Ubicación de la UNGS.
    var ungsLocation = [-34.5221554, -58.7000067];

    // Creación del componente mapa de Leaflet.
    var map = L.map('mapid').setView(ungsLocation, 17);

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
/*
var posicionesHardcodeadas = function(){
    //temporal para agregar posiciones al resto
    for(var j = 0; j < corredores.length; j++){
            if(corredores[j].id == 189){
                var posiciones189 =[
                    {"lat":-34.522729,"lon":-58.702319},{"lat":-34.522982,"lon":-58.702562},{"lat":-34.523181,"lon":-58.702791},{"lat":-34.523402,"lon":-58.703046},{"lat":-34.523633,"lon":-58.703289}
                ];
                for(var i = 0; i<posiciones189.length;i++){
                    corredores[j].positions.push(posiciones189[i]);
                }
            }
            if(corredores[j].id == 705){
                var posiciones705 =[
                    {"lat":-34.522419,"lon":-58.702309},{"lat":-34.522972,"lon":-58.702552},{"lat":-34.523471,"lon":-58.702781},{"lat":-34.523392,"lon":-58.703036},{"lat":-34.523423,"lon":-58.703279}
                ];
                for(var i = 0; i< posiciones705.length;i++){
                    corredores[j].positions.push(posiciones705[i]);
               }
            }
            if(corredores[j].id == 8){
                var posiciones8 =[
                    {"lat":-34.522709,"lon":-58.702299},{"lat":-34.522962,"lon":-58.702542},{"lat":-34.523161,"lon":-58.702871},{"lat":-34.523482,"lon":-58.703026},{"lat":-34.523613,"lon":-58.703269}
                ];
                for(var i = 0; i< posiciones8.length;i++){
                    corredores[j].positions.push(posiciones8[i]);
                }
            }
    }       
    //fin codigo temporal*/

$(bootstrap);
