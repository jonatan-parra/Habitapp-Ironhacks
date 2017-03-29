
$(document).ready(function(){
	$('#buscar').click(function(event) {
		
		$.ajax({
			url: "https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets/GSOY",
			data: { mindate: "", maxdate:"", name:"", datacoverage:"", id:""},
			headers:{ token: "sFDzajKyhjdtwVWQesNWgKtsYXRhLKDO" } 
			
		}).done(function(data){
			console.log("funcionó");
			console.log(data.mindate);
			console.log(data.maxdate);
			console.log(data.name);
			console.log(data.datacoverage);
			console.log(data.id);


		}).fail(function(jqXHR, textStatus, errorThrown){
			console.log('Falló');
		})
	});

});
