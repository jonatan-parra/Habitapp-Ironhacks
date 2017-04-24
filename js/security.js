// Number of crimes to 1 km of distance
function number_of_crimes() {
	lat_house = selected_house.lat;
	lng_house = selected_house.lng;
	total = 0;
	for ( var j=0; j < crimes_lat_lon_2.length; j++){
		lat_crime = crimes_lat_lon_2[j].latitude;
		lng_crime = crimes_lat_lon_2[j].longitude;
		//console.log(lat_crime + " " + lng_crime);
		if (calculateDistanceOfHouse(lat_house, lng_house, lat_crime, lng_crime) < 1){
			total++;
		}
	}
	$('#number_crimes').html('<strong>' + total + '</strong>');
}

// Load data set of crime and configure heat map
function crimesMap(){
	$.ajax({
		url: "https://data.cityofchicago.org/resource/kf95-mnd6.json",
		type: "GET",
		data: {
			"$limit" : 1000,
			"$where" : "latitude > 0 AND date > '2016-05-01T12:00:00' ",
			"$$app_token" : "cErFgNp5cFTsCbkEzqrYKWuIL"
		}
	}).done(function(data){
		for (pos = 0; pos < data.length; pos++){ 
			var node = data[pos];
			var crime = new google.maps.LatLng(node.latitude, node.longitude);
			crimes_lat_lon.push(crime);
			crimes_lat_lon_2[pos] = node;
			number_crimes_by_district[+node.district] += 1;
		}
		heatmap = new google.maps.visualization.HeatmapLayer({
			data: crimes_lat_lon
		});
		heatmap.set('radius', 25);

		// Add graphic
		addGraphCrimes();
		
		//heatmap.setMap(map);
	}).fail(function(error){
			console.log(error);
	});


}

// Show or hide heatmap
$('#security').click(function(event) {
	heatmap.setMap(heatmap.getMap() ? null : map);
});
