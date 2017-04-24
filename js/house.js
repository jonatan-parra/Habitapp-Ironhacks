// Change icon house selected
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

// Calculate distance between two points
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


function deg2rad(deg) {
  return deg * (Math.PI/180)
}

// Take params of user and filter
function setMaxDistanceAndPropertyType(){
	maxDistance = document.getElementById("distance").value - 1;
	propertyType = document.getElementById("seleccion").value;

	updateHomes();
}

// Update the houses according to distance
function updateHomes(){
  	for ( s in markers_house ){
		markers_house[s].setMap(null);	
	}
	show_house(maxDistance);
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
