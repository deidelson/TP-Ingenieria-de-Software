

var Track = function(id, coordenadas){
  this.id=id;
  this.coordenadas=coordenadas;
}

var agregarPistas = function(dato, mapa){
    var pistas = dato.tracks;
    for(var i =0; i<pistas.length; i++){
      var pista = new Track(pistas[i].id, pistas[i].coordinates);
    //  console.log("pista "+i+" "+pista);
      var lista = transformar(pista.coordenadas);
      var poligono = L.polyline(lista).addTo(mapa); //en race paso mapa
    }
}

var transformar = function (coordenadas){
  var lista = [];
  for(var i =0; i<coordenadas.length; i++){
    lista.push([coordenadas[i].lat, coordenadas[i].lon]);
  }
  return lista;
}
