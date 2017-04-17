$(document).ready(function(){
	$('#buscar').click(function(event) {

		// Load icon while ajax is complete 
		loadingSymbol('#result');
		
		$.ajax({
			url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets/GSOY",
			data: { mindate: "", maxdate:"", name:"", datacoverage:"", id:""},
			headers:{ token: "sFDzajKyhjdtwVWQesNWgKtsYXRhLKDO" } 
			
		}).done(function(data){
			$('#result').text('The name is: ' + data.name)
			console.log(data)
		}).fail(function(jqXHR, textStatus, errorThrown){
			console.log('Fail');
		})

		$.ajax({
			url: "https://data.cityofchicago.org/api/views/s6ha-ppgi",
			data: {},
			
		}).done(function(data){
			console.log(data)
		}).fail(function(jqXHR, textStatus, errorThrown){
			console.log('Fail');
		})
	});

	/* Function that show symbol loading before of every ajax*/
	function loadingSymbol(id1){
		$(id1).html('<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> <span class="sr-only">Loading...</span>')
	}

});
