
var margin = {top: 200, right: 40, bottom: 250, left: 40},
    width = 1800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

d3.json("data.json", function(data){

  var frameMin = d3.min(data, function(d) {return d.frame}),
      frameMax=  d3.max(data, function(d) {return d.frame});

  var frameScale = d3.scaleLinear()
      .domain([frameMin, frameMax])
      .rangeRound([0, width]);

 var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "axis axis--grid")
    .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(frameScale)
          .ticks(40)
          .tickSize(-height));
          //.tickFormat(function() { return null; }));

svg.append("g")
    .attr("class", "brush")
      .call(d3.brushX()
        .extent([[0, 0], [width, height]])
        .on("end", brushed));

function brushed() {
  if (!d3.event.sourceEvent) return; // Only transition after input.
  if (!d3.event.selection) return; // Ignore empty selections.
  var selection = d3.event.selection.map(frameScale.invert);
}
});
