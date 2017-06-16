var urlRunner = "https://fastspeedster.herokuapp.com/api/runners";
var urlPosiciones="https://fastspeedster.herokuapp.com/api/positions";

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

var agregarCorredores=function(dato,race){
  var runners=dato.runners;
  for (i = 0; i < runners.length; i++) {
      var corredor=new Runner(runners[i].id,runners[i].name,runners[i].surname,runners[i].sponsor, []);
    corredores.push(corredor);
  }
  traerObjectoJson(urlPosiciones, setearPosiciones, race);
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
