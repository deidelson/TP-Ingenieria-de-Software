function bootstrap() {
  var myObj;
  var posicionesObj;
  var race1K;
  var urlPistas="https://fastspeedster.herokuapp.com/api/tracks";
  var urlRunner = "https://fastspeedster.herokuapp.com/api/runners";
  var urlPosiciones="https://fastspeedster.herokuapp.com/api/positions";

   var Sponsor = function(id,name) {
    this.id = id;
    this.name = name;
};



var mostrar=function(dato){
 console.log(dato);
}

// var devolverPosiciones = function(dato, idCorredor){
//         Posiciones p = new Posiciones(dato.positions);
// }
/*var mostrarCorredores=function(dato){
  var runners=dato.runners;
  for (i = 0; i < runners.length; i++) {
    var sponsor=runners[i];
    var corredor=new Runner(runners[i].id,runners[i].name,runners[i].surname,sponsor,null);
    mostrar(corredor);
  }

}*/
// var setearPosiciones=function(objetoPosiciones, corredor){
//     for(var i=0; i<objetoPosiciones.positions.length;i++){
//         if(objetoPosiciones.positions[i].runner == corredor.id){
//           corredor.positions=objetoPosiciones.positions[i].positions;
//           console.log("checkPoint 1");
//           console.log(corredor.positions);
//         }
//     }
// }

var setearPosiciones=function(idCorredor, url){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          myObj = JSON.parse(this.responseText);
          var ret;
          for(var i=0; myObj.positions[i]; i++){
              if(myObj.positions[i].runner == idCorredor){
                ret=myObj.positions[i].positions;
              }
          }
          return ret;
      }
  };
  xmlhttp.open("GET", url, false);
  xmlhttp.send();
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
      var corredor=new Runner(runners[i].id,runners[i].name,runners[i].surname,runners[i].sponsor,[
                {lon: -58.702329, lat: -34.522739},
                {lon: -58.702572, lat: -34.522992},
                {lon: -58.702801, lat: -34.523191},
                {lon: -58.703056, lat: -34.523412},
                {lon: -58.703299, lat: -34.523643}
            ]);

    //  var corredor=new Runner(runners[i].id,runners[i].name,runners[i].surname,runners[i].sponsor,[]);
     //
    //       corredor.positions = setearPosiciones(runners[i].id, urlPosiciones);
    //       console.log("checkPoint 2");
    //       console.log(corredor.positions);
            //Nos falta fixear esto para no hardcodear las coordenadas y traerlas de un JSON por ejemplo

 //   mostrar(corredor);
    race.addRunner(corredor);
  }
   race1K.start();
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



/*var agregarCorredores=function(race,runnerss){
   for (i = 0; i < runnerss.length; i++) {
     //var corredor=new Runner(runnerss[i].id,runnerss[i].name,runnerss[i].surname);
     mostrar(runners);

}
}*/










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
    traerObjectoJson(urlRunner, agregarCorredores,race1K);
    traerObjectoJson(urlPistas, agregarPistas,map);

  race1K.start();
    // START!

}

$(bootstrap);
