
var heatmap = easyscript();

d3.json("fulldata.json", function(d){

  d3.select("#chart")
    .datum(d)
    .call(heatmap);

});//json
