function overviewChart(selection){

  //carefully selected 20 colours
  var colours = ["#e6194b	", "#3cb44b", "#ffe119", "#0082c8", "#f58231", "#911eb4", "#46f0f0", "#f032e6", "#d2f53c", "#fabebe", "#008080", "#e6beff", "#aa6e28", "#fffac8", "#800000", "#aaffc3", "#808000", "#ffd8b1", "#000080", "#808080"];

  //deterministically assigns a colour to a person(id-number)
  function colour(i){
    i = i%colours.length;
    return colours[i];
  }

  function my(selection){
    selection.each(function(data){
      var smalldata = []; //only used for testing with fewer people
      var numberOfPeople = 20;
      var intext = d3.select("#realheader").text();
      var intextarray = intext.split(" ");
      var actualtrajectories = parseInt(intextarray[1]);
      d3.select("#realheader").text("Visualising " + Math.min(numberOfPeople,actualtrajectories) + " real trajectories"); //shows the amount of trajectories



      var displayedtrajectories = 0;
      var oldperson = -1;
      // console.log(data.length);
      for(i = 0; i < data.length; i++){
        if(data[i].person <= numberOfPeople-1 ){
          smalldata.push(data[i]);
          if(data[i].person != oldperson){
            displayedtrajectories ++;
            oldperson = data[i].person;
          }
        }
      }
      d3.select("#displayedtrajectories").text("showing " + displayedtrajectories + " trajectories at the moment");
      //TODO this is why the window resizes with xscale and yscale changing
      var xMin = d3.min(data, function(d){return d.x}), //max and min
          xMax = d3.max(data, function(d){return d.x}),
          yMin = d3.min(data, function(d){return d.y}),
          yMax = d3.max(data, function(d){return d.y});


      var w = 700,
          h = 500,
          pad = 20,
          left_pad = 20;

      var svg = d3.select(this)
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);
      // console.log(this);

      var xScale = d3.scaleLinear().domain([xMin,xMax]).range([left_pad, w-pad]),
          yScale = d3.scaleLinear().domain([yMax,yMin]).range([pad, h-pad*2]);

      // var xAxis = d3.axisBottom(xScale),
      //     yAxis = d3.axisLeft(yScale);

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


      for(i = 0; i < numberOfPeople; i++){
        var tempperson = [];
        for(j = 0; j < smalldata.length; j++){
          if(smalldata[j].person == i){
            tempperson.push(smalldata[j]);
          }
        }

          // console.log(person);
          svg.append("path")
            .datum(tempperson)
            .attr("class", "line")
            .attr("id", "person" + i)
            .attr("fill", "none")
            // .attr("stroke", "steelblue")
            .attr("stroke", function(){
              // console.log("person i: " + i + "color: " + colour(i));
              //0 = röd, 1 = grön, 2 = gul
              return colour(i);
            })
            .attr("opacity",0)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 3)
            .attr("d", line); //can also be curve etc?
        }//path-creating loop, could be done better?

        // TODO
        // var info = d3.select(this).append("p").attr("id","infotext").text("Details-On-Demand");
        // var dd = data.slice(0,100);
        // console.log(data.length);



          // svg.append("circle").attr("cx",0).attr("cy",0).style("fill","red");
          var lastpoints = [];

          svg.selectAll("path").each(function(d){
            var lastpoint = d[d.length-1];
            // console.log("d");
            // console.log(d);
            if(lastpoint != undefined){
              lastpoints.push(lastpoint);
            }
          });

          svg.selectAll("path").each(function(d){
            var increment = 1/(d.length);
            var opc = 0;
            for(i = 1; i < d.length; i++){
              var temppath = [];
              // var x1 = d[i-1];
              // var x2 = d[i];
              // var difference = Math.abs(x1.x - x2.x);
              // for(j = Math.min(x1.x,x2.x); j < Math.max(x1.x,x2.x); j = j+difference){
              //
              // }
              // console.log(difference);
              temppath.push(d[i-1]);
              temppath.push(d[i]);

              svg.append("path")
              .datum(temppath)
              .attr("class", "line")
              .attr("id", "person" + d[i].person)
              .attr("fill", "none")
              .attr("stroke", function(){
                return colour(d[i].person);
              })
              .attr("opacity",opc)
              .attr("stroke-linejoin", "round")
              .attr("stroke-linecap", "round")
              .attr("stroke-width", 3)
              .attr("d", line); //can also be curve etc?
              opc = opc + increment;
            }

          });

          if(lastpoints.length > 0){
          // console.log("lastpoints");
          // console.log(lastpoints);
          // console.log("---");

          svg.selectAll("circle")
             .data(lastpoints)
             .enter()
             .append("circle")
             .attr("class", "circle")
             .attr("cx", function (d) { return xScale(d.x) })
             .attr("cy", function (d) { return yScale(d.y) })
             .attr("r", 5)
             .style("opacity", 1)
             .style("fill", function(d){
               return(colour(d.person));
             });
           }


           //TODO
           svg.selectAll("path")
             .on("mouseover",function(d){
               // console.log("hi");

             });//selectAll path mouseover


         });//selection.each


  }//my




  return my;
}//overviewChart
