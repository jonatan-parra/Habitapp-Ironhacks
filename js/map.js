//  Normalmente, la casilla de verificación permanece marcada al recargar la página en firefox. Con este comando está desmarcado
$("input:checkbox").prop('checked', false);


var map; // Access global
var initialMarker; 
var latLngDepartament = {lat: 41.8708, lng: -87.6505};  // Location of the departament
var selected_house;

// travel mode initial
var travel_mode;

// Var dataset parks
var data_parks;  // JSON park
var download_parks;  // Downloaded dataset (True/False)
var showing_parks;   // Showing or not the parks (True/False)
var markers_park;    // List of park markers

// var dataset schools
var data_schools;  // JSON schools
var download_schools;  // Downloaded dataset (True/False)
var showing_schools;   // Showing or not the parks (True/False)
var markers_schools;    // List of schools markers

// var dataset fire station
var data_fire_station;  // JSON fire_station
var download_fire_station;  // Downloaded dataset (True/False)
var showing_fire_station;   // Showing or not the fire_station (True/False)
var markers_fire_station;    // List of fire_station markers

// var dataset farmers markets
var data_farmer_market;  // JSON farmer_market
var download_farmer_market;  // Downloaded dataset (True/False)
var showing_farmer_market;   // Showing or not the farmer_market (True/False)
var markers_farmer_market;    // List of farmer_market markers

// var dataset libraries
var data_libraries;  // JSON libraries
var download_libraries;  // Downloaded dataset (True/False)
var showing_libraries;   // Showing or not the libraries (True/False)
var markers_libraries;    // List of libraries markers

// var dataset police_station
var data_police_station;  // JSON police_station
var download_police_station;  // Downloaded dataset (True/False)
var showing_police_station;   // Showing or not the police_station (True/False)
var markers_police_station;    // List of police_station markers

// var dataset house
var data_house;  // JSON house
var download_house;  // Downloaded dataset (True/False)
var showing_house;   // Showing or not the house (True/False)
var markers_house;    // List of house markers
var listener_house;   // listener on click house


// URl Datasets
var url_parks = "https://data.cityofchicago.org/api/views/vcti-mbcd/rows.json?accessType=DOWNLOAD";
var url_schools = "https://data.cityofchicago.org/api/views/75e5-35kf/rows.json?accessType=DOWNLOAD";
var url_fire_station = "https://data.cityofchicago.org/api/views/28km-gtjn/rows.json?accessType=DOWNLOAD";
var url_farmers_markets = "https://data.cityofchicago.org/api/views/x5xx-pszi/rows.json?accessType=DOWNLOAD";
var url_libraries = "https://data.cityofchicago.org/api/views/x8fc-8rcq/rows.json?accessType=DOWNLOAD";
var url_police_station = "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD";

// Url house
var url_house = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";

function initApp(){
	// Init sites
	download_parks = false;
	showing_parks = false;	

	download_schools = false; 
	showing_schools = false; 

	download_fire_station = false;
	showing_fire_station = false;

	download_farmer_market = false;
	showing_farmer_market = false;

	download_libraries = false;
	showing_libraries = false;

	download_police_station = false;
	showing_police_station = false;

	download_house = false;
	showing_house = false;

	// Init the map
	initMap();
}

function initMap() {
 	map = new google.maps.Map(document.getElementById('map'), {
    	center: latLngDepartament,
   		zoom: 14
  	});

    initialMarker = new google.maps.Marker({
    	position: latLngDepartament,
   		map: map,
  		title: 'Departament of Electrical & Computer Engineering',
  		icon: 'img/departament.png',
  	});

    var temp = {lat: 41.8808, lng: -87.6605};
  	var tempMarker = new google.maps.Marker({
    	position: temp,
   		map: map,
  		title: 'You rent house',
  		icon: 'img/home.png',
  	});

    var infowindow = new google.maps.InfoWindow({maxWidth: 150,  content: '' });
    var content_1 = " Departament of Electrical & Computer Engineering. Address: 851 S Morgan St, Chicago, IL 60607. Phone:+1 312-996-3423";
  	google.maps.event.addListener(initialMarker, 'click', function() {
      infowindow.setContent(content_1);
      infowindow.open(map, initialMarker);
    });

  	initialMarker.setAnimation(google.maps.Animation.BOUNCE);

  	setTimeout('clickBounce()',6000);
  	initialMarker.addListener('click', clickBounce);

  	// Load house
  	loading_site(url_house, "house");

  	// Travel mode initial
	travel_mode = google.maps.TravelMode.BICYCLING;

  	// Calculate distance
  	calculateDistance();
}

// Desactive effect in initialMarker 
function clickBounce() {
  if (initialMarker.getAnimation() !== null) {
    initialMarker.setAnimation(null);
  } else {
    initialMarker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout('desactiveBounce()',4000);
  }

}

// Show or hide markers site in the map
function show_or_hide_site(site){

	// Load parks in the map
	if (site == "parks"){
		if (download_parks == false){
  			loading_site(url_parks, site);
  		} else {
  			if (showing_parks == true){
  				showing_parks = false;  // Change state app
  				// remover marks
			  	for ( s in markers_park){ markers_park[s].setMap(null);	}
  			} else{
  				show_parks();
  				showing_parks = true; // Change state app
  			}
  		}
	}

	// Load school in the map
	if (site == "schools"){
		if (download_schools == false){
  			loading_site(url_schools, site);
  		} else {
  			if (showing_schools == true){
  				showing_schools = false;  // Change state app
  				// remover marks
			  	for ( s in markers_schools){ markers_schools[s].setMap(null);	}
  			} else{
  				show_schools();
  				showing_schools = true; // Change state app
  			}
  		}
	}

	// Load fire station in the map
	if (site == "fire_stations"){
		if (download_fire_station == false){
  			loading_site(url_fire_station, site);
  		} else {
  			if (showing_fire_station == true){
  				showing_fire_station = false;  // Change state app
  				// remover marks
			  	for ( s in markers_fire_station){ markers_fire_station[s].setMap(null);	}
  			} else{
  				show_fire_station();
  				showing_fire_station= true; // Change state app
  			}
  		}
	}

	// Load markets in the map
	if (site == "farmers_markets"){
		if (download_farmer_market == false){
  			loading_site(url_farmers_markets, site);
  		} else {
  			if (showing_farmer_market == true){
  				showing_farmer_market = false;  // Change state app
  				// remover marks
			  	for ( s in markers_farmer_market){
			  		if( s!=16 ){ markers_farmer_market[s].setMap(null); }
			  	}
  			} else{
  				show_farmer_market();
  				showing_farmer_market= true; // Change state app
  			}
  		}
	}

	// Load libraries in the map
	if (site == "libraries"){
		if (download_libraries == false){
  			loading_site(url_libraries, site);
  		} else {
  			if (showing_libraries == true){
  				showing_libraries = false;  // Change state app
  				// remover marks
			  	for ( s in markers_libraries){ markers_libraries[s].setMap(null);	}
  			} else{
  				show_libraries();
  				showing_libraries = true; // Change state app
  			}
  		}
	}

	// Load police station in the map
	if (site == "police"){
		if (download_police_station == false){
  			loading_site(url_police_station, site);
  		} else {
  			if (showing_police_station == true){
  				showing_police_station = false;  // Change state app
  				// remover marks
			  	for ( s in markers_police_station){ markers_police_station[s].setMap(null);	}
  			} else{
  				show_police_station();
  				showing_police_station = true; // Change state app
  			}
  		}
	}
	//console.log(site);
}

// https://developers.google.com/maps/documentation/javascript/distancematrix#travel_modes
function calculateDistance(){  
	//travel_modes
	var bicycling;
	var driving;
	var transit;
	var walking;

	bicycling = google.maps.TravelMode.BICYCLING;
    driving = google.maps.TravelMode.DRIVING;
	transit = google.maps.TravelMode.TRANSIT;
	walking = google.maps.TravelMode.WALKING;
	// Important, travelorigin 
	var origin1 = latLngDepartament;
	var destinationA = new google.maps.LatLng(41.8808, -87.6605);

	var service = new google.maps.DistanceMatrixService();
	service.getDistanceMatrix(
	  {
	    origins: [origin1],
	    destinations: [destinationA],
	    travelMode: travel_mode,
	    unitSystem: google.maps.UnitSystem.METRIC,
	    //avoidHighways: Boolean,
	    //avoidTolls: Boolean,
	  }, callback);

	function callback(response, status) {
		if (status == google.maps.DistanceMatrixStatus.OK) {
			var origins = response.originAddresses;
			var destinations = response.destinationAddresses;

			for (var i = 0; i < origins.length; i++) {
			    var results = response.rows[i].elements;
			    for (var j = 0; j < results.length; j++) {
				    var element = results[j];
				    var distance = element.distance.text;
				    var duration = element.duration.text;
				    var from = origins[i];
				    var to = destinations[j];

				    $('#distanceUniversity').html('<strong>' + distance + '</strong>');
				    $('#timeArrive').html('<strong>' + duration + '</strong>');
				    $('#homeUbicacion').html('<strong>' + from + '</strong>');

				   	var travel1 = getTravelMode();
				   	var modeName = "No valid";
				   	if (travel1 == bicycling){
				   		modeName = "Bicycle"
				   	} else if ( travel_mode == driving) {
				   		modeName = "Driving"
				   	} else if ( travel_mode == transit) {
				   		modeName = "Public transit"
				   	} else if ( travel_mode == walking){
				   		modeName = "Walking"
				   	} else {
				   		console.log("Error callback, travel mode");
				   	}
				   	$('#modeTravel').html('<strong>' + modeName + '</strong>');
				//   	alert("aqui")
			    }
			}
		}
	}
}

// ------------------------------ Load site dataset --------------------------------------------------//
function loading_site(url, name_site) {
	var xmlhttp = new XMLHttpRequest();  //create a new httprequest for this session
	//var url = "https://data.cityofchicago.org/api/views/75e5-35kf/rows.json?accessType=DOWNLOAD"; //json format data resource url 
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	//once the request is accepted, process the fowllowing function to get data and complete the app information
	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var myArr = xmlhttp.responseText;
	        var text = myArr;

	        if (name_site == "parks") {
	        	data_parks = JSON.parse(text);
	       		show_parks();  // Show parks when load the data
   	        	download_parks = true; // Change state app, this dataset is download only once.
	        } else if (name_site == "schools"){
	        	data_schools = JSON.parse(text);
	        	show_schools();  // Show schools when load the data
   	     		download_schools = true; // Change state app, this dataset is download only once.
	        } else if (name_site == "fire_stations"){
	        	data_fire_station= JSON.parse(text);
	        	show_fire_station();  
   	     		download_fire_station = true;
	        } else if ( name_site == "farmers_markets"){
	        	data_farmer_market= JSON.parse(text);
	        	show_farmer_market();  
   	     		download_farmer_market = true;
	        } else if ( name_site == "libraries"){
	        	data_libraries= JSON.parse(text);
	        	show_libraries();  
   	     		download_libraries = true;
	        } else if ( name_site == "police"){
	        	data_police_station = JSON.parse(text);
	        	show_police_station();  
   	     		download_police_station = true;
	        } else if ( name_site == "house"){
	        	data_house = JSON.parse(text);
	        	show_house();  
   	     		download_house = true;
	        } else {
	        	console.log("Error en loading site")
	        }	        
    	} 
	}
}

// Show markers parks 
function show_parks() {
	latitude_park = 27;//13;
	longitude_park = 26; //12;
    markers_park = [];  //add markers on the map
    name_parks = [];  // Name parks 

    for(var i=0; i < data_parks.data.length;  i++){
    	var latLng = JSON.parse('{ "lat":'+ data_parks.data[i][latitude_park] +', "lng":'+ data_parks.data[i][longitude_park] +' }');
      	var name_park = data_parks.data[i][9];
      	if ( name_parks.indexOf(name_park) < 0 ) {
      		name_parks.push(name_park);
	    	markers_park[i] = new google.maps.Marker({
					    		position: latLng, map: map, title: name_park, icon: 'img/tree.png'
					  		});
    	}
    }
    showing_parks = true; // Change state app
 } 

// show markers schools
function show_schools() {
	latitude_schools = 17;
	longitude_schools = 18; ;
    markers_schools = [];  //add markers on the map
    name_schools = []; // Name schools

    for(var i=0; i < data_schools.data.length;  i++){
    	var name_school = data_schools.data[i][9];
    	var latLng = JSON.parse('{ "lat":'+ data_schools.data[i][latitude_schools] +', "lng":'+ data_schools.data[i][longitude_schools] +' }');
    	if ( name_schools.indexOf(name_school) < 0 ) {
			name_schools.push(name_school);
    		markers_schools[i] = new google.maps.Marker({
				    				position: latLng, map: map, title: name_school, icon: 'img/school.png'
				  				});
    	}
    }
    showing_schools = true; // Change state app
 } 

 // show markers fire station
function show_fire_station() {
    markers_fire_station = [];  //add markers on the map
    for(var i=0; i < data_fire_station.data.length;  i++){
    	var name_fire_station = data_fire_station.data[i][8];
    	var latLng = JSON.parse('{ "lat":'+ data_fire_station.data[i][14][1] +', "lng":'+ data_fire_station.data[i][14][2] +' }');
    	markers_fire_station[i] = new google.maps.Marker({
				    	position: latLng, map: map, title: name_fire_station, icon: 'img/fire_station.png'
				  	});
    }
    showing_fire_station = true; // Change state app
 } 

// Show markers farmer market
function show_farmer_market(){
	latitude = 18;
	longitude = 19; 
    markers_farmer_market = [];  //add markers on the map

    for(var i=0; i < data_farmer_market.data.length;  i++){
    	var name_farmer_market = data_farmer_market.data[i][8];
    	var latLng = JSON.parse('{ "lat":'+ data_farmer_market.data[i][latitude] +', "lng":'+ data_farmer_market.data[i][longitude] +' }');
    	
    	if( i != 16){ // In this position do not existe latitude/longitude
	    	markers_farmer_market[i] = new google.maps.Marker({
					    	position: latLng, map: map, title: name_farmer_market, icon: 'img/market.png'
					  	});
    	}
    }
    showing_farmer_market = true; // Change state app
}

// show markers libraries
function show_libraries() {
    markers_libraries = [];  //add markers on the map
    for(var i=0; i < data_libraries.data.length;  i++){
    	var name_librarie = data_libraries.data[i][8];
    	var latLng = JSON.parse('{ "lat":'+ data_libraries.data[i][18][1] +', "lng":'+ data_libraries.data[i][18][2] +' }');
    	markers_libraries[i] = new google.maps.Marker({
				    	position: latLng, map: map, title: name_librarie, icon: 'img/library.png'
				  	});
    }
    showing_fire_station = true; // Change state app
} 

// show markers police station
function show_police_station() {
    markers_police_station = [];  //add markers on the map
    for(var i=0; i < data_police_station.data.length;  i++){
    	var address_police_station = data_police_station.data[i][10];
    	var latLng = JSON.parse('{ "lat":'+ data_police_station.data[i][20] +', "lng":'+ data_police_station.data[i][21] +' }');
    	markers_police_station[i] = new google.maps.Marker({
				    	position: latLng, map: map, title: address_police_station, icon: 'img/police.png'
				  	});
    }
    showing_police_station = true; // Change state app
} 

// show markers house
function show_house() {
    markers_house = [];  //add markers on the map
    for(var i=0; i < data_house.data.length;  i++){
    	var address_house = data_house.data[i][12];
    	var latLng = JSON.parse('{ "lat":'+ data_house.data[i][19] +', "lng":'+ data_house.data[i][20] +' }');
    	if (data_house.data[i][19] != null){
	    	markers_house[i] = new google.maps.Marker({
					    	position: latLng, map: map, title: address_house, icon: 'img/home.png'
					  	});
	    	markers_house[i].addListener('click', selectHouse);
	    }
    }
    showing_house = true; // Change state app
} 

function selectHouse(){
	//console.log(data_house.data[number_house][13]);
	console.log("Click in house");
}


function setTravelMode(new_mode){
	this.travel_mode = new_mode;
	calculateDistance();
}

function getTravelMode(){
	return this.travel_mode;
}

