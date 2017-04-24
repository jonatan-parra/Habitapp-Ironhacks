//create a new httprequest for this session
var xmlhttp = new XMLHttpRequest();
//json format data resource url 
var url = "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=08cce1158be58f3fa256cddf9a948573";
xmlhttp.open("GET", url, true);
xmlhttp.send();

//once the request is accepted, process the fowllowing function to get data and complete the app information
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = xmlhttp.responseText;
        var text = myArr;
        var json = JSON.parse(text);
        //alert(JSON.parse(text).coord.lon);
        //document.getElementById("id01").innerHTML = myArr;
        //console.log(json);
    
        document.getElementById("climate").innerHTML = "Today the weather is <b>" + json.weather[0].main + "</b>";
	}
}

$(document).ready(function(){
	$('#buscar').click(function(event) {

		// Load icon while ajax is complete 
		loadingSymbol('#result');
		
		$.ajax({
            //url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/data/?datatypeid=PRCP&datatypeid=TMAX&datatypeid=TMIN&datatypeid=AWND&datatypeid=SNOW",
            url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=PRECIP_15&stationid=COOP:010008&units=metric&startdate=2010-05-01&enddate=2010-05-31",
            data: {
				/*locationid: "CITY:US170006",
				datasetid: "GHCND",
				startdate: "2010-01-01",
				enddate: "2010-01-01",
				limit: 1000,
				sortfield: "date",
				units: "metric",
				offset: 1001*/
                  },
			headers:{ 
				token: "sFDzajKyhjdtwVWQesNWgKtsYXRhLKDO"
			} 
			
		}).done(function(data){
			//$('#result').text('The name is: ' + data.name)
			console.log("Funciono");
			console.log(data);
		}).fail(function(jqXHR, textStatus, errorThrown){
			console.log('Fail');
		})
	});

	/* Function that show symbol loading before of every ajax*/
	function loadingSymbol(id1){
		$(id1).html('<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> <span class="sr-only">Loading...</span>')
	}

});
