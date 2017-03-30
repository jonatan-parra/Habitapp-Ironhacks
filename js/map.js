var map;
const LATITUDE = 13;
const LONGITUDE = 12;
function initMap() {
	var myLatLng = {lat: 41.8708, lng: -87.6505},
 		map = new google.maps.Map(document.getElementById('map'), {
    	center: myLatLng,
   		zoom: 14
  	});

    var initialMarker = new google.maps.Marker({
    	position: myLatLng,
   		map: map,
  		title: 'Hello World!'
  	});



  	loadingSymbol('#parks');
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
	        	latLng = '{ "lat":'+ json.data[i][LATITUDE] +', "lng":'+ json.data[i][LONGITUDE] +' }';
	        	latLng = JSON.parse(latLng); // Convert string to JSON
	        	var n = new google.maps.Marker({
						    	position: latLng,
						   		map: map,
						  		title: 'Hello World!'
						  	});
	        }

		}
	}
}


function loadingSymbol(id1){
	$(id1).html('<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> <span class="sr-only">Loading...</span>')
}

