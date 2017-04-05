var map; // Access global
var initialMarker; 
var latLngDepartament = {lat: 41.8708, lng: -87.6505};  // Location of the departament

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

// URl Datasets
var url_parks = "https://data.cityofchicago.org/api/views/vcti-mbcd/rows.json?accessType=DOWNLOAD";
var url_schools = "https://data.cityofchicago.org/api/views/75e5-35kf/rows.json?accessType=DOWNLOAD";
var url_fire_station = "https://data.cityofchicago.org/api/views/28km-gtjn/rows.json?accessType=DOWNLOAD";

function initApp(){
	// Init sites
	download_parks = false;
	showing_parks = false;	

	download_schools = false; 
	showing_schools = false; 

	download_fire_station = false;
	showing_fire_station = false;

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
			  	for(var i=0; i<data_parks.data.length; i++){ markers_park[i].setMap(null); }
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
			  	for(var i=0; i<data_schools.data.length; i++){ markers_schools[i].setMap(null); }
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
			  	for(var i=0; i<data_fire_station.data.length; i++){ markers_fire_station[i].setMap(null); }
  			} else{
  				show_fire_station();
  				showing_fire_station= true; // Change state app
  			}
  		}
	}
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

    for(var i=0; i < data_parks.data.length;  i++){
    	var latLng = JSON.parse('{ "lat":'+ data_parks.data[i][latitude_park] +', "lng":'+ data_parks.data[i][longitude_park] +' }');
    	markers_park[i] = new google.maps.Marker({
				    	position: latLng, map: map, title: 'Name park', icon: 'img/tree.png'
				  	});
    }
    showing_parks = true; // Change state app
 } 

// show markers schools
function show_schools() {
	latitude_schools = 17;
	longitude_schools = 18; ;
    markers_schools = [];  //add markers on the map

    for(var i=0; i < data_schools.data.length;  i++){
    	var latLng = JSON.parse('{ "lat":'+ data_schools.data[i][latitude_schools] +', "lng":'+ data_schools.data[i][longitude_schools] +' }');
    	markers_schools[i] = new google.maps.Marker({
				    	position: latLng, map: map, title: 'Name schools', icon: 'img/school.png'
				  	});
    }
    showing_schools = true; // Change state app
 } 

 // show markers fire station
function show_fire_station() {
    markers_fire_station = [];  //add markers on the map
    for(var i=0; i < data_fire_station.data.length;  i++){
    	var latLng = JSON.parse('{ "lat":'+ data_fire_station.data[i][14][1] +', "lng":'+ data_fire_station.data[i][14][2] +' }');
    	markers_fire_station[i] = new google.maps.Marker({
				    	position: latLng, map: map, title: 'Name fire station', icon: 'img/fire_station.png'
				  	});
    }
    showing_fire_station = true; // Change state app
 } 

function setTravelMode(new_mode){
	this.travel_mode = new_mode;
	calculateDistance();
}

function getTravelMode(){
	return this.travel_mode;
}


