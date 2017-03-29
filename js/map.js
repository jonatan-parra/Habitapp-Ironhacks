var map;
function initMap() {
	var myLatLng = {lat: 41.8708, lng: -87.6505},
 		map = new google.maps.Map(document.getElementById('map'), {
    	center: myLatLng,
   		zoom: 14
  	});

    var marker = new google.maps.Marker({
    	position: myLatLng,
   		map: map,
  		title: 'Hello World!'
  	});

}

