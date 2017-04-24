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
		intersection = "<strong> Intersection:</strong>  " +  data_site.data[i][9] + '<br />' ;
		day = "<strong> Schedule:</strong>  " + data_site.data[i][10]  + ": ";
		star_time = data_site.data[i][11] + " to "; // 
		end_time = data_site.data[i][12] + ", "; // 
		web_site = data_site.data[i][15][0];
		web_site = '<br /><a href="' + web_site + '"  target="_blank" > ' + web_site + '</a>'
		mytext = location1 + intersection + day + star_time + end_time + web_site;
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
		mytext = name + address + size;
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
