var Race = function(name, map) {
    this.name = name;
    this.map = map;
    this.runnersData = [];
    this.addRunner = function(runner) {
        //Creamos el layer en el mapa para ese runner
        //var runnerLayer = L.featureGroup().addTo(this.map);
        var runnerLayer = L.featureGroup().bindPopup(runner.name+" "+runner.surname+"</br>Sponsor: "+runner.sponsor.name)
        .on('click', function(){})
        .addTo(this.map);
        //runnerLayer.pop
        // Agregamos el layer al control
        this.map.layersControl.addOverlay(runnerLayer, runner.name);
       console.log(runner.name);

        var updater = function(newPosition) {
            console.log("Updating view for runner: " + runner.name + "!!");
            console.log(newPosition);

            var runnerIcon = L.icon({
                iconUrl: 'runner2.png',
                iconSize:[35, 35], // size of the icon
            });

            // Opción 1.
            var marker = L.marker(newPosition, {icon:runnerIcon});
            // Opción 1.
            runnerLayer.addLayer(marker);
			      if(runner.positions[runner.positions.length-1] != newPosition)
				        removeRunner(runnerLayer,marker);


            // Opción 2.
            // runnerLayer.addLayer(L.circleMarker(newPosition, {
            //                         radius: 7,
            //                         fillColor: "#00AA00",
            //                         color: "#DDD",
            //                         weight: 1,
            //                         opacity: 1,
            //                         fillOpacity: 0.3
            //                     }));
        }

        this.runnersData.push({
            runner: runner,
            updater: updater
        })
    }

    var removeRunner = function(runnerLayer,marker){
		setTimeout(function() {
			 runnerLayer.removeLayer(marker);
        }, 1000);
		console.log("borrado");
	   }

    this.start = function() {
        console.log("empezo carrera");
        this.runnersData.forEach(function(data) {
            var runner = data.runner;
            runner.run(data.updater);
        });
    }
};
