
//notes:
// lets start with a line, if it looks too choppy, use a curve instead
var newData = [];

d3.json("data.json", function(data){

  var person1 = [];
  var numberOfPeople = 100;

  for(i = 0; i < data.length; i++){
    if(data[i].person <= numberOfPeople-1 ){
      person1.push(data[i]);
    }
  }


  var xMin = d3.min(data, function(d){return d.x}), //max and min
      xMax = d3.max(data, function(d){return d.x}),
      yMin = d3.min(data, function(d){return d.y}),
      yMax = d3.max(data, function(d){return d.y});


  var w = 1080,
      h = 600,
      pad = 20,
      left_pad = 100;

  var svg = d3.select("#graph")
              .append("svg")
              .attr("width", w)
              .attr("height", h);


  var xScale = d3.scaleLinear().domain([xMin,xMax]).range([left_pad, w-pad]),
      yScale = d3.scaleLinear().domain([yMax,yMin]).range([pad, h-pad*2]);

  var xAxis = d3.axisBottom(xScale),
      yAxis = d3.axisLeft(yScale);

  var cValue = function(d) { return d.person;},
      color = d3.scaleOrdinal(d3.schemeCategory10);

  var line = d3.line()
    .x(function(d){return xScale(d.x);})
    .y(function(d){return yScale(d.y);});


  // svg.append("g")
  //    .attr("class", "axis")
  //    .attr("transform", "translate(0, "+(h-pad)+")")
  //    .call(xAxis);
  //
  // svg.append("g")
  //    .attr("class", "axis")
  //    .attr("transform", "translate("+(left_pad-pad)+", 0)")
  //    .call(yAxis);
  //
  // svg.append("g")
  //     .attr("class", "brush")
  //     .call(d3.brushY()
  //     .on("brush",brushed));

  for(i = 0; i < numberOfPeople; i++){
    var tempperson = [];
    for(j = 0; j < person1.length; j++){
      if(person1[j].person == i){
        tempperson.push(person1[j]);
      }
    }
    // console.log(person);
    svg.append("path")
      .datum(tempperson)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }


  // var dd = data.slice(0,100);
  // console.log(data.length);



  svg.selectAll("circle")
     .data(person1)
     .enter()
     .append("circle")
     .attr("class", "circle")
     .attr("cx", function (d) { return xScale(d.x) })
     .attr("cy", function (d) { return yScale(d.y) })
     .attr("r", 5)
     .style("fill",function(d) { return color(d.person);} )
     .on("click", function(d1){
       svg.selectAll("circle").attr("r", function(d){
         if(d.person == d1.person){
           return "5";
         }else{
           return "5";
         }
       }).style("fill", function(d){
         if(d.person == d1.person){
           return "red";
         }else{
           return "gray";
         }
       });
       console.log(d1);
       // d.attr("r", 10).style("fill", "red");
     });

    //
    //  //Det här fungerar ju inte
    // function brushstart() {
    //  svg.classed("selecting", true);
    // }


    // filter(function(d,i){
    //   if(yScale(d[0].y) >= miny && yScale(d[0].y) <= maxy ){
    //     // console.log(d[0].y);
    //     return d;
    //   }
    //  }).
     //the function that takes care of what happens on "brush" event
   // function brushed() {
   //   var area = d3.event.selection;
   //   var miny = area[0];
   //   var maxy = area[1];
   //   svg.selectAll(".line").style("stroke",function(d){
   //     // console.log(d.getPointAtLength(0.1));
   //     // console.log("d: " + d);
   //     // console.log("miny: " + miny + " maxy: " + maxy);
   //     if(yScale(d[0].y) >= miny && yScale(d[0].y) <= maxy){
   //       return "red";
   //     }else{
   //       return "steel-blue";
   //     }
   //   });

   // }//brushed
});
