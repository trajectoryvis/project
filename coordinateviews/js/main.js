

var data1;
var data;

d3.json("data/data.json", function(d){
  doSomething(d);
});
function doSomething(jsondata){
  data1 = jsondata;
  data = jsondata;
  console.log(data);
  //TODO: nested function, reading both data, since the rest of the script is run otherwise.

console.log(data1);
console.log("hello " + data);
// console.log(data);
var staticOverview = overviewChart();
var myslider = frameSeriesChart();
var trajectories = overviewChart();

d3.json("data/datasim.json", function(datasim){



//not sure if this is needed, maybe useful later
//--------------------------
  // var csData = crossfilter(data);
  // csData.frame = csData.dimension(function(d){
  //   return d.frame;
  // });
  // csData.person = csData.dimension(function(d){
  //   return d.person;
  // })
  //
  // csData.frames = csData.frame.group();
  // csData.people = csData.person.group();

  myslider.onbrushed(function(selected){
       var mini = selected[0];
       var maxi = selected[1];

       var nydatareal = [];
       var nydatasim = [];

       for(i = 0; i < data.length; i++){
         if(data[i].frame >= mini && data[i].frame <= maxi ){
           nydatareal.push(data[i]);
         }
       }

       for(i = 0; i < datasim.length; i++){
         if(datasim[i].frame >= mini && datasim[i].frame <= maxi ){
           nydatasim.push(datasim[i]);
         }
       }


      // //TODO this is where we will select which trajectories to show
      // var person1 = [];
      // var numberOfPeople = 2;
      // // var numberOfPeople = Math.floor((Math.random() * 100) + 1);
      // for(i = 0; i < data.length; i++){
      //   if(data[i].person <= numberOfPeople-1 ){
      //     person1.push(data[i]);
      //   }
      // }
      // data1 = person1;
      // console.log(person1.frames);

      update(nydatareal,nydatasim);
  });//selected

  // console.log(csData.frames.all())
//---------------------

  function update(nydatareal,nydatasim){
    console.log("update");
// -------Without these, it just adds new elements BUG, not anymore I think, could be cleaned up
    // d3.select("#frameline").remove();
    // d3.select("#frames").append("div").attr("id", "frameline");

    d3.select("#trajectories").remove();
    d3.select("#traj").append("div").attr("id", "trajectories");

    d3.select("#overview").remove();
    d3.select("#over").append("div").attr("id", "overview");
    // myslider = frameSeriesChart();
    // ----------------
    // var svg = myslider.svg();
    // console.log(svg);
    // svg.selectAll("*").remove();
    // d3.select(myslider.svg()).remove();
    // console.log(data);

    // d3.select("#frameline")
    //   .datum(data)
    //   .call(myslider);

  //.datum(csData.people.all()) not sure why this would be better
  d3.select("#overview")
  		.datum(nydatasim)
  		.call(staticOverview);

  d3.select("#trajectories")
    .datum(nydatareal)
    .call(trajectories);
  }//update

//------------duplication, fix when  update works as intended, then just call update()
  d3.select("#frameline")
    .datum(data)
    .call(myslider);

//.datum(csData.people.all()) not sure why this would be better
  d3.select("#overview")
    .datum(datasim)
    .call(staticOverview);

  d3.select("#trajectories")
    .datum(data)
    .call(trajectories);
});
}
// });//d3.json
