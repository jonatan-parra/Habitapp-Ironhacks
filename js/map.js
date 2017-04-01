var map; // Access global
var initialMarker; 
var latLngDepartament = {lat: 41.8708, lng: -87.6505};


//travel_modes
var bicycling;
var driving;
var transit;
var walking;

// travel mode initial
var travel_mode = driving;



function setTravelMode(new_mode){
	this.travel_mode = new_mode;
	calculateDistance();
}

function getTravelMode(){
	return this.travel_mode;
}

const LATITUDE = 13;
const LONGITUDE = 12;
function initMap() {

	// travel mode initial

	
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

  	bicycling = google.maps.TravelMode.BICYCLING;
    driving = google.maps.TravelMode.DRIVING;
    transit = google.maps.TravelMode.TRANSIT;
    walking = google.maps.TravelMode.WALKING;

    // Travel mode initial
	travel_mode = bicycling;


    // Load parks in the map
  	loadingParks();

  	// Calculate distance
  	calculateDistance();
}




/* Desactive effect in initialMarker */
function clickBounce() {
  if (initialMarker.getAnimation() !== null) {
    initialMarker.setAnimation(null);
  } else {
    initialMarker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout('desactiveBounce()',4000);
  }

}



function loadingParks() {
	//create a new httprequest for this session
	var xmlhttp = new XMLHttpRequest();
	//json format data resource url 
	var url = "https://data.cityofchicago.org/api/views/pxyq-qhyd/rows.json?accessType=DOWNLOAD";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	//once the request is accepted, process the fowllowing function to get data and complete the app information
	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var myArr = xmlhttp.responseText;
	        var text = myArr;
	        var json = JSON.parse(text);
    
	        //number of the markets
	        var numberOfMarkets = json.data.length;

	        //add markers on the map
	        var markers = [];

	        for(var i=0; i<numberOfMarkets; i++){
	        	var latLng = "";
	        	latLng = JSON.parse('{ "lat":'+ json.data[i][LATITUDE] +', "lng":'+ json.data[i][LONGITUDE] +' }');
	        	var n = new google.maps.Marker({
						    	position: latLng,
						   		map: map,
						  		title: 'Name park',
						  		icon: 'img/tree.png'
						  	});
	        }
		}
	}
}
 
 // https://developers.google.com/maps/documentation/javascript/distancematrix#travel_modes
function calculateDistance(){  	

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
				    console.log(to)

				   	var travel1 = getTravelMode();
				   	var modeName = "No valid";
				   	if (travel1 == bicycling){
				   		modeName = "Bicycle"
				   	} else if ( travel_mode == driving) {
				   		modeName = "Driving"
				   	} else if ( travel_mode == transit) {
				   		modeName = "Public transit"
				   	} else {
				   		modeName = "Walking"
				   	}

				   	$('#modeTravel').html('<strong>' + modeName + '</strong>');

			    }
			}
		}
	}
}
