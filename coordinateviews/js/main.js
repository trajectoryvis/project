var myoverviewChart = overviewChart();
var myslider = frameSeriesChart();

d3.json("data/data.json", function(data){
	d3.select("#overview")
		.datum(data)
		.call(myoverviewChart);

  d3.select("#frameline")
    .datum(data)
    .call(myslider);
});//d3.json
