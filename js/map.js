
var map; // Access global
var initialMarker; 
var latLngDepartament = {lat: 41.8708, lng: -87.6505};  // Location of the departament
var selected_house = latLngDepartament; // At the beginning there is no house selected
var select_house_in_map; // House selected by the user
var propertyType = "All";
var maxDistance = 50;

var crimes_lat_lon = [];
var crimes_lat_lon_2 = []; 
var number_crimes_by_district = [];
var num_police_districts = 25;
var heatmap;

// travel mode 
var travel_mode;
var markers_house;

// var dataset house
var data_house;  // JSON house
var download_house;  // Downloaded dataset (True/False)
var showing_house;   // Showing or not the house (True/False)
var markers_house;    // List of house markers
var listener_house;   // listener on click house

var previous_house = null;


// Configure the app and init
function initApp(){
	// Init sites
	for (var i = 0; i <= number_of_sites; i++) {
		showing_site[i] = false;
		download_site[i] = false;
	}

	for (var i = 0; i <= num_police_districts; i++ ){
		number_crimes_by_district[i] = 0;
	}

	show_site[S_PARK] = show_parks;
	show_site[S_HOUSE] = show_house;
	show_site[S_SCHOOL] = show_schools;
	show_site[S_FIRE_STATION] = show_fire_station;
	show_site[S_FARMER_MARKET] = show_farmer_market;
	show_site[S_LIBRARY] = show_libraries;
	show_site[S_POLICE_STATION] = show_police_station;
	show_site[S_GROCERY_STORE_CHAINS] = show_grocery_store_chains;
	show_site[S_INDEPENDENT_STORES] = show_independent_stores;

	// init map
	initMap();

	//getPriceHouse();

	// Crime data is uploaded 
	crimesMap();

}

function initMap() {
 	map = new google.maps.Map(document.getElementById('map'), {
    	center: latLngDepartament,
   		zoom: 13
  	});

    initialMarker = new google.maps.Marker({
    	position: latLngDepartament,
   		map: map,
  		title: 'Departament of Electrical & Computer Engineering',
  		icon: 'img/departament.png',
  	});

    var infowindow = new google.maps.InfoWindow({maxWidth: 150,  content: '' });
    var content_1 = "<strong> Departament of Electrical & Computer Engineering. Address: 851 S Morgan St, Chicago, IL 60607. Phone:+1 312-996-3423 </strong>" ;
  	google.maps.event.addListener(initialMarker, 'click', function() {
      infowindow.setContent(content_1);
      infowindow.open(map, initialMarker);
    });;

  	// Load house
  	loading_site(url_site[S_HOUSE], S_HOUSE);


  	// Travel mode initial
	travel_mode = google.maps.TravelMode.BICYCLING;
}



// Calculate distance using google maps
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
	var destinationA = selected_house;

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
			//console.log(select_house_in_map.address_house);

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
				    //$('#homeUbicacion').html('<strong>' + to + '</strong>');
				    $('#homeUbicacion').html('<strong>' + select_house_in_map.address_house + '</strong>');

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
			    }
			}
		}
	}
} 

function setTravelMode(new_mode){
	this.travel_mode = new_mode;
	calculateDistance();
}

function getTravelMode(){
	return this.travel_mode;
}




 
// Normally, the check box remains checked when the page is loaded in firefox. This command is unchecked
$("input:checkbox").prop('checked', false);


// Slider 
var rangeSlider = function(){
  var slider = $('.range-slider'),
      range = $('.range-slider__range'),
      value = $('.range-slider__value');
    
  slider.each(function(){

    value.each(function(){
      var value = $(this).prev().attr('value');
      $(this).html(value + " km");
    });

    range.on('input', function(){
      $(this).next(value).html(this.value + " km");
    });
  });
};

rangeSlider();

