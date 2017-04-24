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

var data_site = [];  // Dataset site
var download_site = []; // Downloaded dataset (True/False)
var showing_site = []; // Showing or not the sites (True/False)
var markers_site = [];  // List of sites markers

var show_site = []; // Function show

var S_HOUSE = 0;
var S_PARK = 1;
var S_SCHOOL = 2;
var S_FIRE_STATION = 3;
var S_FARMER_MARKET = 4;
var S_LIBRARY = 5;
var S_POLICE_STATION = 6;
var S_GROCERY_STORE_CHAINS = 7;
var S_INDEPENDENT_STORES = 8;
var number_of_sites = 8;

// URl Datasets
var url_site = [];
url_site[S_HOUSE] = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
url_site[S_PARK] = "https://data.cityofchicago.org/api/views/vcti-mbcd/rows.json?accessType=DOWNLOAD";
url_site[S_SCHOOL] = "https://data.cityofchicago.org/api/views/75e5-35kf/rows.json?accessType=DOWNLOAD";
url_site[S_FIRE_STATION] = "https://data.cityofchicago.org/api/views/28km-gtjn/rows.json?accessType=DOWNLOAD";
url_site[S_FARMER_MARKET] = "https://data.cityofchicago.org/api/views/x5xx-pszi/rows.json?accessType=DOWNLOAD";
url_site[S_LIBRARY] = "https://data.cityofchicago.org/api/views/x8fc-8rcq/rows.json?accessType=DOWNLOAD";
url_site[S_POLICE_STATION] = "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD";
url_site[S_GROCERY_STORE_CHAINS] = "https://data.cityofchicago.org/api/views/wryv-d7zf/rows.json?accessType=DOWNLOAD";
url_site[S_INDEPENDENT_STORES] = "https://data.cityofchicago.org/api/views/ddxq-pdr6/rows.json?accessType=DOWNLOAD";

// Grocery store chains https://catalog.data.gov/dataset/nearby-cook-county-grocery-store-chains-cc102
// independent https://catalog.data.gov/dataset/nearby-independent-cook-county-grocery-stores-180c9

// var dataset house
var data_house;  // JSON house
var download_house;  // Downloaded dataset (True/False)
var showing_house;   // Showing or not the house (True/False)
var markers_house;    // List of house markers
var listener_house;   // listener on click house

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

// http://c3js.org/samples/pie_label_format.html
function addGraphCrimes(){
	
    var data = {};
	var sites = [];
	/*jsonData.forEach(function(e) {
	    sites.push(e.name);
	    data[e.name] = e.upload;
	})*/
	for(var i=1; i < number_crimes_by_district.length-13; i++) {
	    sites.push("District "+i);
	    data["District "+i] = +number_crimes_by_district[i];
	} 
	chart = c3.generate({
		bindto: '#securityInTheDistrict_1',		
	    data: {
	        json: [ data ],
	        keys: {
	            value: sites,
	        },
	        type:'pie'
	    },
	    pie: {
      		label: {
            	format: function (value, ratio, id) {
                	return d3.format('')(value);
            	}
        	}
    	}
	});

    var data = {};
	var sites = [];

	for(var i=13; i < number_crimes_by_district.length; i++) {
	    sites.push("District "+i);
	    data["District "+i] = +number_crimes_by_district[i];
	} 

	chart = c3.generate({
		bindto: '#securityInTheDistrict_2',		
	    data: {
	        json: [ data ],
	        keys: {
	            value: sites,
	        },
	        type:'pie'
	    },
	    pie: {
      		label: {
            	format: function (value, ratio, id) {
                	return d3.format('')(value);
            	}
        	}
    	}
	});
}

function initMap() {
 	map = new google.maps.Map(document.getElementById('map'), {
    	center: latLngDepartament,
   		zoom: 11
  	});

    initialMarker = new google.maps.Marker({
    	position: latLngDepartament,
   		map: map,
  		title: 'Departament of Electrical & Computer Engineering',
  		icon: 'img/departament.png',
  	});

    var infowindow = new google.maps.InfoWindow({maxWidth: 150,  content: '' });
    var content_1 = " Departament of Electrical & Computer Engineering. Address: 851 S Morgan St, Chicago, IL 60607. Phone:+1 312-996-3423";
  	google.maps.event.addListener(initialMarker, 'click', function() {
      infowindow.setContent(content_1);
      infowindow.open(map, initialMarker);
    });;

  	// Load house
  	loading_site(url_site[S_HOUSE], S_HOUSE);


  	// Travel mode initial
	travel_mode = google.maps.TravelMode.BICYCLING;
}

// Show or hide markers site in the map
function show_or_hide_site(site){

	// Load site in the map
	if (download_site[site] == false){
			loading_site( url_site[site], site );
	} else {
		if (showing_site[site] == true){
			showing_site[site] = false;  // Change state app
			// remover marks
			markers_1 = markers_site[site]
		  	for ( s in markers_1 ){
		  		markers_site[site][s].setMap(null);	
		  	}
		} else{
			show = show_site[site];
			show();
			showing_site[site] = true; // Change state app 
		}
	}
	//console.log(site);
}


  

function setMaxDistanceAndPropertyType(){
	maxDistance = document.getElementById("distance").value - 1;
	propertyType = document.getElementById("seleccion").value;

	updateHomes();
}

function updateHomes(){
  	for ( s in markers_house ){
		markers_house[s].setMap(null);	
	}

	show_house(maxDistance);
}

var previous_house = null;

function changeIconHouse(){
	if (previous_house != null){
		m1 = previous_house;
		markers_house[m1.number_house].setMap(null);
	    markers_house[m1.number_house] = create_marker_house(m1.position, m1.address_house, 'img/home.png', m1.infowindow, m1.address_house, m1.number_house);
		
	} else {
		console.log("Entro al else");
	}
	// Save previous house
	previous_house = select_house_in_map;

	m1 = select_house_in_map;
	markers_house[m1.number_house].setMap(null);
	markers_house[m1.number_house] = create_marker_house(m1.position, m1.address_house, 'img/home2.png', m1.infowindow, m1.address_house, m1.number_house);
}


function calculateDistanceOfHouse(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d.toFixed(3);
}

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



function deg2rad(deg) {
  return deg * (Math.PI/180)
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
// ------------------------------ Load site dataset --------------------------------------------------//
function loading_site(url, num_site) {
	var xmlhttp = new XMLHttpRequest();  //create a new httprequest for this session
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	//once the request is accepted, process the fowllowing function to get data and complete the app information
	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var myArr = xmlhttp.responseText;
	        var text = myArr;

        	data_site[num_site] = JSON.parse(text);
        	show = show_site[num_site];
        	show();
        	download_site[num_site] = true;
    	} 
	}
}

// show markers parks
function show_parks(){
	// params (position latitude, position longitude, position name site or other date, data_set, icon, site number)
	markers_site[S_PARK] = show_place_markers(27, 26, 9, data_site[S_PARK], 'img/tree.png', S_PARK);
}

// show markers schools
function show_schools() {
	markers_site[S_SCHOOL] = show_place_markers(17, 18, 9, data_site[S_SCHOOL], 'img/school.png', S_SCHOOL );
}

// Show markers farmer market
function show_farmer_market(){
	markers_site[S_FARMER_MARKET] = show_place_markers(18, 19, 8, data_site[S_FARMER_MARKET], 'img/market.png', S_FARMER_MARKET);
}

// show markers police station
function show_police_station() {
	markers_site[S_POLICE_STATION] = show_place_markers(20, 21 , 10 , data_site[S_POLICE_STATION], 'img/police.png', S_POLICE_STATION);
}

// show markers fire station
function show_fire_station() {
	// params (position lat_lng, position name site or other date, data_set, icon )
	markers_site[S_FIRE_STATION] = show_place_markers_1 (14, 8, data_site[S_FIRE_STATION], 'img/fire_station.png', S_FIRE_STATION);
}

// show markers libraries
function show_libraries() {
	markers_site[S_LIBRARY] = show_place_markers_1(18, 8, data_site[S_LIBRARY], 'img/library.png', S_LIBRARY);
}

// Show marker grocery store chains
function show_grocery_store_chains() {
	markers_site[S_GROCERY_STORE_CHAINS] = show_place_markers_1(14 , 8 , data_site[S_GROCERY_STORE_CHAINS], 'img/store_chain.png', S_GROCERY_STORE_CHAINS);
}


// Show marker independent stores
function show_independent_stores() {
	markers_site[S_INDEPENDENT_STORES] = show_place_markers_1(30, 8 , data_site[S_INDEPENDENT_STORES], 'img/independent_store.png', S_INDEPENDENT_STORES);
}


function getContentInfoWindow(num, data_site, i){
	var mytext = "Text no edited";
	if ( num == S_FARMER_MARKET ){
		location1 = '<p class= "title_info_window">'+ data_site.data[i][8] + "</p> "; // 
		day = "<strong> Schedule:</strong>  " + data_site.data[i][10]  + ": ";
		star_time = data_site.data[i][11] + " to "; // 
		end_time = data_site.data[i][12] + ", "; // 
		web_site = data_site.data[i][15][0];
		web_site = '<br /><a href="' + web_site + '"  target="_blank" > ' + web_site + '</a>'
		mytext = location1 + day + star_time + end_time + web_site;
	} else if ( num == S_LIBRARY ) {
		name = '<p class= "title_info_window">'+ data_site.data[i][8] + "</p> ";
		schedule = "<strong> Schedule:</strong>  " + data_site.data[i][9] + '<br />' ;
		address = "<strong> Address:</strong>  " +  data_site.data[i][12] + '<br />' ;
		phone =  "<strong> Phone:</strong>  " + data_site.data[i][16] + '<br />' ;
		web_site = data_site.data[i][17];
		web_site = '<a href="' + web_site + '"  target="_blank" > ' + web_site + '</a>'
		mytext = name + schedule + address + phone + web_site;
	} else if ( num == S_PARK ){
		name = '<p class= "title_info_window">'+ data_site.data[i][9] + "</p> ";
		address = "<strong> Address:</strong>  " +  data_site.data[i][19] + '<br />' ;
		mytext = name + address;
	} else if ( num == S_FIRE_STATION ){
		name = '<p class= "title_info_window">'+ data_site.data[i][8] + "</p> ";
		address = "<strong> Address:</strong>  " +  data_site.data[i][9] + '<br />' ;
		mytext = name + address;
	} else if ( num == S_SCHOOL ) {
		name = '<p class= "title_info_window"> Name: '+ data_site.data[i][9] + "</p> ";
		address = "<strong> Address:</strong>  " +  data_site.data[i][12] + '<br />' ;
		grades = "<strong> Grades:</strong>  " +  data_site.data[i][16] + '<br />' ;
		phone =  "<strong> Phone:</strong>  " + data_site.data[i][19] + '<br />' ;
		mytext = name + address + grades + phone;
	} else if ( num == S_POLICE_STATION ){
		name = '<p class= "title_info_window">'+  "District: "+ data_site.data[i][8] + ", "+ data_site.data[i][9] + "</p> ";
		address = "<strong> Address:</strong>  " +  data_site.data[i][10] + '<br />' ;
		phone =  "<strong> Phone:</strong>  " + data_site.data[i][15] + '<br />' ;
		web_site = data_site.data[i][14][0];
		web_site = '<a href="' + web_site + '"  target="_blank" > ' + web_site + '</a>'
		mytext = name + address + phone + web_site;
	} else if ( num == S_GROCERY_STORE_CHAINS){
		company = '<p class= "title_info_window">'+  "Company: "+ data_site.data[i][8] + "</p> ";	
		store_type = "<strong> Store type:</strong>  " +  data_site.data[i][9] + '<br />' ;
		address = "<strong> Address:</strong>  " +  data_site.data[i][10] + '<br />' ;		
		mytext = company + store_type + address;
	} else if (num == S_INDEPENDENT_STORES) {
		name = '<p class= "title_info_window"> Name: '+ data_site.data[i][8] + "</p> ";
		address = "<strong> Address:</strong>  " +  data_site.data[i][9] + '<br />' ;
		size = "<strong> Store type:</strong>  " +  data_site.data[i][13] + '<br />' ;
		meat = "<strong> meat:</strong>  " +  data_site.data[i][16] + '<br />' ;
		general = "<strong> general:</strong>  " +  data_site.data[i][17] + '<br />' ;
		mytext = name + address + size + meat + general;
	} else if ( num == S_HOUSE){
		address = '<p class= "title_info_window"> Address: ' +  data_site.data[i][12] + ' </p>' ;
		units =  " <strong> Price in units: </strong> "+ '$' + data_site.data[i][16] +  "<br /> "; 
		message = "  For information on rents, contact each property directly.<br />" ;
		area =  " <strong> Community area: </strong> "+ data_site.data[i][8] + ", "+ data_site.data[i][9] + "<br /> ";
		property_type = "<strong> Property type:</strong>  " +  data_site.data[i][10] + '<br />' ;
		property_name = "<strong> Property name:</strong>  " +  data_site.data[i][11] + '<br />' ;
		phone =  "<strong> Phone:</strong>  " + data_site.data[i][14] + '<br />' ;
		management_company = "<strong> Management company:</strong>  " +  data_site.data[i][15] + '<br />' ;
		mytext = address + units + message + area + property_type + property_name + phone;
	}

	return mytext;
}

// Show markers sites
function show_place_markers(lat, lng, name1, data_site, img_icon, num ) {
    sites = [];  //add markers on the map
    names = [];  // Name site or other information important 
    for(var i=0; i < data_site.data.length;  i++){

    	var latLng = JSON.parse('{ "lat":'+ data_site.data[i][lat] +', "lng":'+ data_site.data[i][lng] +' }');
      	var name = data_site.data[i][name1];
	    if (data_site.data[i][lat] != null ){ // Verify that the latitude in the dataset is valid
	      	if ( names.indexOf(name) < 0 ) {
	      		names.push(name);

				var mytext = getContentInfoWindow(num, data_site, i);
				var myinfowindow = new google.maps.InfoWindow({	content: mytext	});

				// Add marker
		    	m = new google.maps.Marker({
						    		position: latLng, map: map, title: name, icon: img_icon, infowindow: myinfowindow
				});

				// Add infoWindow
			  	google.maps.event.addListener(m, 'click', function() {
			      this.infowindow.open(map, this);
			    });

			    // Add marker in array
			  	sites[i] = m;
		    }
	    }
	}
	showing_site[num] = true;
    return sites;
} 

// Show markers sites, format json in latitude and longitude
function show_place_markers_1(lat_lng, name1, data_site, img_icon, num ) {
    sites = [];  //add markers on the map
    names = [];  // Name site or other information important 
    for(var i=0; i < data_site.data.length;  i++){
    	var latLng = JSON.parse('{ "lat":'+ data_site.data[i][lat_lng][1] +', "lng":'+ data_site.data[i][lat_lng][2] +' }');
      	var name = data_site.data[i][name1];
	    if (data_site.data[i][lat_lng][1] != null ){ // Verify that the latitude in the dataset is valid
	      	if ( names.indexOf(name) < 0 ) {
	      		names.push(name);

				var mytext = getContentInfoWindow(num, data_site, i);
				var myinfowindow = new google.maps.InfoWindow({	content: mytext	});

	      		// Add marker
		    	m = new google.maps.Marker({
						    		position: latLng, map: map, title: name, icon: img_icon, infowindow: myinfowindow
				});

		    	// Add infoWindow
			  	google.maps.event.addListener(m, 'click', function() {
			      this.infowindow.open(map, this);
			    });

		    	// Add marker in array
		    	sites[i] = m;
	    	}
	    }
	}
	showing_site[num] = true;
    return sites;
} 

// show markers house
function show_house( maxDistance=50 ) {
    markers_house = [];  //add markers on the map
    data_house = data_site[S_HOUSE];
    for(var i=0; i < data_house.data.length;  i++){
    	var address_house = data_house.data[i][12];
    	var latLng = JSON.parse('{ "lat":'+ data_house.data[i][19] +', "lng":'+ data_house.data[i][20] +' }');
    	if (data_house.data[i][19] != null){
    		distanceHouse = calculateDistanceOfHouse(data_house.data[i][19], data_house.data[i][20], 41.8708, -87.6505);
    		if( distanceHouse < maxDistance && (propertyType == "All" || propertyType == data_house.data[i][10] )  ){
    			var mytext = getContentInfoWindow(S_HOUSE, data_house, i);
				var myinfowindow = new google.maps.InfoWindow({	content: mytext	});

				// Add marker
		    	m = create_marker_house(latLng, address_house, 'img/home.png', myinfowindow, data_house.data[i][12], i);
		    	
				markers_house[i] = m;
			}
	    }
    }
    showing_site[S_HOUSE] = true;
    return markers_house;
} 

function create_marker_house(latLng, address_house, icon, myinfowindow, address, i){
	m = new google.maps.Marker({
		position: latLng, map: map, title: address_house, icon: icon, 
		infowindow: myinfowindow, address_house: address, number_house: i
	});
	
	m.addListener('click', function() {
		new_selected_house = JSON.parse('{ "lat":'+ this.position.lat() +', "lng":'+ this.position.lng() +' }');
		//console.log(new_selected_house);
		
		selected_house = new_selected_house;
		calculateDistance();
		select_house_in_map = this;
		number_of_crimes();
		changeIconHouse();
	});

	// Add infoWindow
	google.maps.event.addListener(m, 'click', function() {
		this.infowindow.open(map, this);
	});

	return m
}




// https://dev.socrata.com/foundry/data.cityofchicago.org/6zsd-86xi
//https://catalog.data.gov/dataset/crimes-2001-to-present-398a4
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
			//console.log(crimes_lat_lon_2[pos]);
			number_crimes_by_district[+node.district] += 1;
		}
		//crimes_lat_lon_2 = crimes_lat_lon;
		//console.log(number_crimes_by_district);

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





function getPriceHouse(){
//http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz199ggom3y17_7ucak&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA&rentzestimate=true
	api_zillow = "https://www.zillow.com/webservice/GetSearchResults.htm?zws-id="
	id_zillow  =  "X1-ZWz199ggom3y17_7ucak";
	params_zillow = "&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA&rentzestimate=true";
	url = api_zillow + id_zillow + params_zillow;

	//var url = {some url of data.gov dataset}
/*	$.ajax({
	  url: url
		}).done(function(data){
			console.log("Funcionó");
		}).fail(function(error){
			console.log("Error");
		})
*//*
console.log("sasdf");
	var invocation = new XMLHttpRequest();
	//var url = 'http://bar.other/resources/public-data/';
	//console.log(invocation);
	
	 // if(invocation) {    
	 	
	    invocation.open('GET', url, true);
	    //invocation.onreadystatechange = handler;
	 	invocation.onreadystatechange = function() {
		    if (invocation.readyState == 4 && xmlhttp.status == 200) {
		        var myArr = invocation.responseText;
		        var text = myArr;
		        console.log('funciono');
		    }
		}
	    invocation.send(); 

	    //console.log('entrooo');
	  //}

*/	

	var xmlhttp = new XMLHttpRequest();  //create a new httprequest for this session
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	//once the request is accepted, process the fowllowing function to get data and complete the app information
	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var myArr = xmlhttp.responseText;
	        var text = myArr;
	        console.log('funciono');

        	/*data_site[num_site] = JSON.parse(text);
        	show = show_site[num_site];
        	show();
        	download_site[num_site] = true;*/
    	} 
	}

/*	console.log("Entrando a getPrice");
	var httpRequest = new XMLHttpRequest();
	httpRequest.open('GET', url, true);
	httpRequest.setRequestHeader( 'Access-Control-Allow-Origin', '*');
	//httpRequest.setRequestHeader( 'Content-Type', 'application/json' );
	httpRequest.onerror = function(XMLHttpRequest, textStatus, errorThrown) {
	  console.log( 'The data failed to load :(' );
	  //console.log(JSON.stringify(XMLHttpRequest));
	};
	httpRequest.onload = function() {
	  console.log('SUCCESS!');
	}
*/


//http://stackoverflow.com/questions/25316393/keep-getting-no-access-control-allow-origin-error-with-xmlhttprequest
//http://stackoverflow.com/questions/28547288/no-access-control-allow-origin-header-is-present-on-the-requested-resource-err
/*	$.ajax({
		url: url, //"https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets/GSOY",
		data: { },
		headers:{ token: id_zillow, 'Access-Control-Allow-Origin': '*' } 
		
	}).done(function(data){
		//$('#result').text('The name is: ' + data.name)
		console.log(data)
	}).fail(function(jqXHR, textStatus, errorThrown){
		console.log('Fail');
	})
*/
/*
	var dataSetJsonObject;
	$.get(url, function( response ){
		//here you can handle the response as a json object.
		dataSetJsonObject = response;
		
		console.log(dataSetJson);

	}, "json");
	
	//log the respones if you want;
	*/

}


function setTravelMode(new_mode){
	this.travel_mode = new_mode;
	calculateDistance();
}

function getTravelMode(){
	return this.travel_mode;
}


 
