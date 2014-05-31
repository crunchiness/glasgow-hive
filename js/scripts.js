
var map, heatmap;

function initialize(congestionPoints) {
  
  var mapOptions = {
    zoom: 15,
    center: new google.maps.LatLng(55.860387, -4.24875),
    mapTypeId: google.maps.MapTypeId.STREET
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

//google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function() {
	
	var endpointUrl = "http://glasgowhive.azurewebsites.net/congestion/get",
		pointArray;

	// Set up the map
	initialize();
  	
	$.get(endpointUrl, function(data) {
		data = testData;
		heatmap.setMap(null);

		pointArray = new google.maps.MVCArray([]);	
  		heatmap = new google.maps.visualization.HeatmapLayer({
   			data: pointArray
  		});  

		$.each(data.congestionPoints, function(k, v) {
			
			pointArray.push({
				location: new google.maps.LatLng(v.latitude, v.longitude),
				weight: v.weight
			});
			
		});

  		heatmap.setMap(map);

	});
	
	/* Testing data */
	/*
	var testData = {
		"congestionPoints" : [
			{
				latitude: 55.865387,
				longitude: -4.26875,
				weight: 5
			},
			{
				latitude: 55.865487,
				longitude: -4.26875,
				weight: 10
			},
			{
				latitude: 55.865587,
				longitude: -4.26875,
				weight: 15
			},
			{
				latitude: 55.865687,
				longitude: -4.26875,
				weight: 20
			},
			{
				latitude: 55.865787,
				longitude: -4.26875,
				weight: 25
			},
			{
				latitude: 55.865887,
				longitude: -4.26875,
				weight: 30
			}															
		]
	};
	data = testData;
	pointArray = new google.maps.MVCArray([]);	
	heatmap = new google.maps.visualization.HeatmapLayer({
		data: pointArray
	});  
	$.each(data.congestionPoints, function(k, v) {
		pointArray.push({
			location: new google.maps.LatLng(v.latitude, v.longitude),
			weight: v.weight
		});
	});
  	heatmap.setMap(map);
  	*/	
  	

});