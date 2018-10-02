function heatmap(selection){

  var xpartitions = 100;
  var ypartitions = 100;
  var maxcount = 0;
  // var maxcount = 10;
  var margin = { top: 50, right: 0, bottom: 100, left: 30 },
      width = 960 - margin.left - margin.right,
      height = 430 - margin.top - margin.bottom,
      gridSizeX = Math.floor(width / xpartitions),
      gridSizeY = Math.floor(width / ypartitions),
      legendElementWidth = gridSizeX*2,
      buckets = 9,
      colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"];

  function my(selection){
    //selection is going to be whatever div we have chosen in main
    selection.each(function(data){

    var xMin = d3.min(data, function(d){return d.x}),
        xMax = d3.max(data, function(d){return d.x}),
        yMin = d3.min(data, function(d){return d.y}),
        yMax = d3.max(data, function(d){return d.y});

    var colorScale = d3.scaleQuantize()
        .domain([0, Math.max(9,maxcount)])
        .range(colors);

    // var griddata = [];
    // for(tt = 0; tt < xpartitions; tt++){
    //   for(tti = 0; tti < ypartitions; tti++){
    //     griddata.push(tt);
    //   }
    // }


    var svg = d3.select("#chart").append("svg")
        .attr("id","oursvg")
        // .style("display", "none")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
        // .append("g")
        // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var svgelement = document.getElementById("oursvg");
    var svgcoordinates = svgelement.getBoundingClientRect();
     var svgleft = svgcoordinates.left;
     var svgright = svgcoordinates.right;
     var svgtop = svgcoordinates.top;
     var svgbottom = svgcoordinates.bottom;

     var xScale = d3.scaleLinear().domain([xMin,xMax]).range([svgleft, svgright]),
         yScale = d3.scaleLinear().domain([yMax,yMin]).range([svgtop, svgbottom]);  //TODO ??? Check to see if upside down


    for(i = 0; i < xpartitions; i++){
      for(j = 0; j < ypartitions; j++){
        svg.append("rect")
          .attr("x", function(d){return i*gridSizeX;})
          .attr("y", function(d){return j*gridSizeY;})
          .attr("class", "c0")
          .attr("width", gridSizeX)
          .attr("height", gridSizeY)
          .style("shape-rendering", "crispEdges") //otherwise there are sometimes lines due to anti-aliasing
          .style("fill", "white");
          // .style("fill", function(){return colorScale(4)});
      }//j
    }//i

    for(i = 0; i < data.length; i++){
      var x = xScale(data[i].x);
      var y = yScale(data[i].y);
      var elem = document.elementFromPoint(x,y);
      var selectedelem = d3.select(elem);
      var count = 0;
      if(selectedelem._groups[0][0] != null){
        var klassen = selectedelem.attr("class") || "c0";  //evaluate second (0) if first fails to evaluate
        var klassarray = klassen.split("");
        count = parseInt(klassarray[1]);
        count++;
        if(count > maxcount){
          maxcount = count;
        }
        selectedelem.style("fill",function(){
          return colorScale(count);
        });
        selectedelem.attr("class",function(){
          return "c" + count;
        });
      }
      // sle.style("fill","red");
    }//counting

    for(i = 0; i < data.length; i++){
      var x = xScale(data[i].x);
      var y = yScale(data[i].y);
      var elem = document.elementFromPoint(x,y);
      var selectedelem = d3.select(elem);
      var count = 0;
      if(selectedelem._groups[0][0] != null){
        var klassen = selectedelem.attr("class") || "c0";  //evaluate second (0) if first fails to evaluate
        var klassarray = klassen.split("");
        count = parseInt(klassarray[1]);
        selectedelem.style("fill",function(){
          return colorScale(count);
        });
      }
      // sle.style("fill","red");
    }//counting

    //
    // for(i = 0; i < maxcount; i++){
    //   var colour = colorScale(i);
    //   console.log(colour);
    //   var classtoselect = "c" + i;
    //   // console.log(svg.selectAll(classtoselect));
    //   var sele = svg.selectAll("rect");
    //   sele.each(function(d){
    //     console.log(d);
    //   });
    // }

    // svg.append("circle").attr("cx", 25).attr("cy", 25).attr("r", 25).style("fill", "#081d58");







    console.log("maxcoutn: " + maxcount);

    });//selection.each
  }//my
  return my;
}//main function
