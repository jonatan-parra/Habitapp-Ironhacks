
var xmlhttp = new XMLHttpRequest();
var url = "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=08cce1158be58f3fa256cddf9a948573";
xmlhttp.open("GET", url, true);
xmlhttp.send();

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = xmlhttp.responseText;
        var text = myArr;
        var json = JSON.parse(text);
    
        document.getElementById("climate").innerHTML =  "<strong>" + json.weather[0].description + "</strong>";
        document.getElementById("weather").innerHTML= "<strong> Humidity:  </strong>" + json.main.humidity + "<br />"
        												+ "<strong> Pressure:  </strong>" + json.main.pressure + "<br />"
        												+ "<strong> Temperature: </strong>" + json.main.temp + "<br />"
        												+ "<strong> Maximum temperature: </strong>" + json.main.temp_max + "<br />"
        												+ "<strong> Minimum temperature: </strong>" + json.main.temp_min;
	}
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