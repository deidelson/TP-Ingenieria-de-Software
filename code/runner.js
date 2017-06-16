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
