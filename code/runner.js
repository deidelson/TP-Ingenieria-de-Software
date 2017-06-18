
var Runner = function(id,name,surname,sponsor,historyPositions) {
    this.id = id;
    this.name = name;
    this.surname=surname;
    this.sponsor=sponsor;
    this.positions = historyPositions;

    var actualIx = 0;

    this.setPositions = function(posi){
      this.positions=posi;
    }

    this.run = function(callback) {
      //console.log(this.name);
        var self = this;
        setTimeout(function() {

          if(historyPositions!=null){

            if(historyPositions.length!==0){

              callback(historyPositions[actualIx]);

              actualIx += 1;
                if(actualIx < historyPositions.length) {

                  self.run(callback);
                  }
            }
          }


        }, 1000);
    }
};

var Sponsor = function(id,name) {
 this.id = id;
 this.name = name;
};

var agregarCorredores=function(dato,race){
  var runners=dato.runners;
  for (i = 0; i < runners.length; i++) {
      var corredor=new Runner(runners[i].id,runners[i].name,runners[i].surname,runners[i].sponsor, []);
    corredores.push(corredor);
  }
  estanCorredores=true;
  traerObjectoJson(urlPosiciones, setearPosiciones,race);
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
    posicionesHardcodeadas();
    for(var i=0; i<corredores.length;i++){
      race.addRunner(corredores[i]);
    }
    estanPosiciones=true;
    race.start();
}

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
}
