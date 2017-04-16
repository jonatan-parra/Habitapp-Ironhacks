$(document).ready(function(){
	$('#buscar').click(function(event) {


	//open weather maps
	var urlBaseOWM = "http://history.openweathermap.org/data/2.5/";
	var appIdOWM = "&appid=08cce1158be58f3fa256cddf9a948573";

	var latitude = 41.8708;
	var longitude = -87.6505;

	//var url = urlBaseOWM + "weather?lat=" + latitude + "&lon=" + longitude;
	var url = urlBaseOWM + "history/city?lat=41.85&lon=-87.65";
    url += appIdOWM;



    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            json = JSON.parse(xmlhttp.responseText);
            console.log(json);
           /* $("#weatherDay").text((new Date()).toString().slice(0, 10));
            $("#weatherDayIcon").attr("src", urlOWMIcons + json.weather[0].icon + ".png");
            $("#weatherDayIcon").attr("title", json.weather[0].description);
            fahrenheit ?
                $("#weatherDayMaxMin").text(covertToFahrenheit(json.main.temp_min) + "º | " + covertToFahrenheit(json.main.temp_max) + "º F") :
                $("#weatherDayMaxMin").text(covertToCelcius(json.main.temp_min) + "º | " + covertToCelcius(json.main.temp_max) + "º C");*/
        }
    };

	   
   //http://history.openweathermap.org/data/2.5/history/city?q={city ID},{country code}&type=hour&start={start}&end={end}
//http://history.openweathermap.org/data/2.5/history/city?lat={lat}&lon={lon}&type=hour&start={start}&end={end}

//lat: 41.8708, lng: -87.6505
		// Load icon while ajax is complete 
	/*	loadingSymbol('#result');

		//url = "http://api.openweathermap.org/data/2.5/history/city?lat=41.85&lon=-87.65&appid=08cce1158be58f3fa256cddf9a948573";
		//url = "http://history.openweathermap.org/data/2.5/history/city?lat=41.85&lon=-87.65&appid=08cce1158be58f3fa256cddf9a948573";
		url = "http://samples.openweathermap.org/data/2.5/history/city?lat=41.85&lon=-87.65&appid=b1b15e88fa797225412429c1c50c122a1";

		var xmlhttp = new XMLHttpRequest();  //create a new httprequest for this session
		xmlhttp.open("GET", url, true);
		xmlhttp.send();

		xmlhttp.addHeader("Access-Control-Allow-Origin", "http://www.example.com");


		//once the request is accepted, process the fowllowing function to get data and complete the app information
		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		        var myArr = xmlhttp.responseText;
		        var text = myArr;

	        	data_site1 = JSON.parse(text);
	        	console.log(data_site1);
	    	} 
		}

		console.log("fuera");*/
/*
		$.ajax({
			url: "https://data.cityofchicago.org/api/views/s6ha-ppgi",
			data: {},
			
		}).done(function(data){
			console.log("Otro"); 
			console.log(data)
		}).fail(function(jqXHR, textStatus, errorThrown){
			console.log('Fail');
		})*/
	});

	/* Function that show symbol loading before of every ajax*/
	function loadingSymbol(id1){
		$(id1).html('<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> <span class="sr-only">Loading...</span>')
	}

});


//http://openweathermap.org/history 
// http://www.unixtimestamp.com/index.php