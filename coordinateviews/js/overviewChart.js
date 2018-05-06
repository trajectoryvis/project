function overviewChart(selection,data){

  //carefully selected 20 colours
  var colours = ["#e6194b	", "#3cb44b", "#ffe119", "#0082c8", "#f58231", "#911eb4", "#46f0f0", "#f032e6", "#d2f53c", "#fabebe", "#008080", "#e6beff", "#aa6e28", "#fffac8", "#800000", "#aaffc3", "#808000", "#ffd8b1", "#000080", "#808080"];

  //deterministically assigns a colour to a person(id-number)
  function colour(i){
    i = i%colours.length;
    return colours[i];
  }

  function my(selection,data){
    selection.each(function(d){

      var newData = [];

      // d3.json("data/data.json", function(data){

        var person1 = [];
        var numberOfPeople = 50;

        for(i = 0; i < data.length; i++){
          if(data[i].person <= numberOfPeople-1 ){
            person1.push(data[i]);
          }
        }


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


        var xScale = d3.scaleLinear().domain([xMin,xMax]).range([left_pad, w-pad]),
            yScale = d3.scaleLinear().domain([yMax,yMin]).range([pad, h-pad*2]);

        var xAxis = d3.axisBottom(xScale),
            yAxis = d3.axisLeft(yScale);

        var cValue = function(d) { return d.person;},
            color = d3.scaleOrdinal(d3.schemeCategory10);

        var line = d3.line()
          .x(function(d){return xScale(d.x);})
          .y(function(d){return yScale(d.y);});


        svg.append("g")
           .attr("class", "axis")
           .attr("transform", "translate(0, "+(h-pad)+")")
           .call(xAxis);

        svg.append("g")
           .attr("class", "axis")
           .attr("transform", "translate("+(left_pad-pad)+", 0)")
           .call(yAxis);

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
            .attr("id", "person" + i)
            .attr("fill", "none")
            // .attr("stroke", "steelblue")
            .attr("stroke", function(tt){
              return colour(i);
            })
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 2)
            .attr("d", line);
        }
        // console.log(person1);  //remember, it logs everything twice since we have 2 graphs

        var info = d3.select(this).append("p").attr("id","infotext");
        // var dd = data.slice(0,100);
        // console.log(data.length);



        svg.selectAll("circle")
           .data(person1)
           .enter()
           .append("circle")
           .attr("class", "circle")
           .attr("cx", function (d) { return xScale(d.x) })
           .attr("cy", function (d) { return yScale(d.y) })
           .attr("r", 10)
           .style("opacity", 0)
           .style("fill",function(d) { return color(d.person);})
           .on("mouseover", function(d1){
           //   // console.log(svg.selectAll("path
             var paths = svg.selectAll("path");
             var currentpath = paths._groups[0][d1.person];
             for(i = 0; i < numberOfPeople; i++){
               d3.select("#person" + i).attr("opacity",function(d){
                 return "0.1";
               });
             }
             currentpath.setAttribute("opacity", "1");
             // currentpath.setAttribute("stroke-width", 4);
           //   var thispath = svg.select("#person" + d1.person);
           //   thispath.attr("stroke","red");
             // thispath.attr("stroke", function(tt){
             //   // console.log(d1.person);
             //   return colour(d1.person);
             });
             // console.log(currentpath);
             // console.log(d1.person)
             // info.text("Person: " + d1.person);
             // svg.selectAll("circle").attr("r", function(d){
             //   if(d.person == d1.person){
             //     return "10";
             //   }else{
             //     return "10";
             //   }
             // }).style("fill", function(d){
             //   if(d.person == d1.person){
             //     return "red";
             //   }else{
             //     return "gray";
             //   }
             // });
             // console.log(d1);
             // d.attr("r", 10).style("fill", "red");
           // }).on("mouseout", function(d){
             // for(i = 0; i < numberOfPeople; i++){
             //   d3.select("#person" + i).attr("stroke",function(d){
             //     return colour(i);
             //   });
           //   // }
           // });

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
      // });
    });
  }//my

  return my;
}//overviewChart
