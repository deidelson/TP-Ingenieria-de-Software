function bootstrap() {
  var myObj;

  var race1K;
  var urlPistas="https://fastspeedster.herokuapp.com/api/tracks";
  var urlRunner = "https://fastspeedster.herokuapp.com/api/runners";
  var urlPosiciones="https://fastspeedster.herokuapp.com/api/positions";
  var corredores = [];

   var Sponsor = function(id,name) {
    this.id = id;
    this.name = name;
};



var mostrar=function(dato){
 console.log(dato);
}

var setearPosiciones=function(objetoPosiciones, race){
    for(var i=0; i<objetoPosiciones.positions.length;i++){
        for(var j=0; j<corredores.length; j++){

            if(objetoPosiciones.positions[i].runner == corredores[j].id){
              var posi=objetoPosiciones.positions[i].positions;

               for(var x =0; x<posi.length;x++){
                 corredores[j].positions.push(posi[x]);
               }

            }
        }

    }
    for(var i=0; i<corredores.length;i++){
      race.addRunner(corredores[i]);
    }
    race.start();
}




var transformar = function (coordenadas){
  var lista = [];
  for(var i =0; i<coordenadas.length; i++){
    lista.push([coordenadas[i].lat, coordenadas[i].lon]);
  }
  return lista;
}

var agregarCorredores=function(dato,race){
  var runners=dato.runners;
  for (i = 0; i < runners.length; i++) {
      var corredor=new Runner(runners[i].id,runners[i].name,runners[i].surname,runners[i].sponsor, []);
    corredores.push(corredor);
  }
  traerObjectoJson(urlPosiciones, setearPosiciones, race);
}

  var agregarPistas = function(dato, mapa){
  var pistas = dato.tracks;
  for(var i =0; i<pistas.length; i++){
    var pista = new Track(pistas[i].id, pistas[i].coordinates);
  //  console.log("pista "+i+" "+pista);
    var lista = transformar(pista.coordenadas);
    var poligono = L.polygon(lista).addTo(mapa); //en race paso mapa
  }
}

var traerObjectoJson = function(url,accion,race) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          myObj = JSON.parse(this.responseText);
          accion(myObj,race);
      }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}


    // Ubicación de la UNGS.
    var ungsLocation = [-34.5221554, -58.7000067];

    // Creación del componente mapa de Leaflet.
    var map = L.map('mapid').setView(ungsLocation, 15);

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

    // Creamos un círculo con centro en la UNGS.
//     var circle = L.circle(ungsLocation, {
//         color: '#0000AA',
//         fillColor: '#0000CC',
//         fillOpacity: 0.2,
//         radius: 300
//     }).addTo(map);

    // Creamos un polígono.
//     L.polygon([
//         L.latLng(-34.515594, -58.705654),
//         L.latLng(-34.523503, -58.714062),
//         L.latLng(-34.519177, -58.719890),
//         L.latLng(-34.511089, -58.711374),
//         L.latLng(-34.514062, -58.707909),
//         L.latLng(-34.513824, -58.707584),
//     ]).addTo(map);

  // traerObjectoJson(urlPistas, agregarPistas,map);

    // Creamos un marker sobre la UNGS.
    // var ungsMarker = L.marker(ungsLocation);
    // ungsMarker.addTo(map);





    race1K = new Race("1K", map);
    var rapiFacil= new Sponsor(1,"Rapifacil");
    // Bolt!




    var bolt = new Runner(1,"Usain","Bolt",rapiFacil, [
            {lon: -58.702329, lat: -34.522739},
            {lon: -58.702572, lat: -34.522992},
            {lon: -58.702801, lat: -34.523191},
            {lon: -58.703056, lat: -34.523412},
            {lon: -58.703299, lat: -34.523643}
        ]);

  var pepe = new Runner(2,"Pepa","Pig",rapiFacil, [
            {lon: -58.695290, lat: -34.524297},
            {lon: -58.697030, lat: -34.522856},
            {lon: -58.698210, lat: -34.521874}
        ]);
    //
    //



    console.log("Competidores:");
    //race1K.addRunner(pepe);
   // race1K.addRunner(bolt);
  traerObjectoJson(urlPistas, agregarPistas,map);
  traerObjectoJson(urlRunner, agregarCorredores,race1K);

}

$(bootstrap);
