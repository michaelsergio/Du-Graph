function testNumbers() {
  var nums = [1, 9, 8, 7, 2, 3, 6, 4, 5];
  var settings = {
    sample:nums,
    frequencyThreshold:eval(nums.join('+'))/nums.length
  };
  
  var udgraph = new UdGraph(settings);
  var graphstr = udgraph.consoleString();
  var summary = udgraph.topValue() + ' / ' + udgraph.bottomValue();

  console.log(centerTitle(summary, graphstr)); 
  console.log(graphstr);
}

function testTeam() {
  var gameRecords = [
    {win:1, home:true},
    {win:0, home:false},
    {win:1, home:true},
    {win:0, home:true},
    {win:1, home:false},
    {win:0, home:false},
    {win:1, home:false},
    {win:1, home:true},
    {win:1, home:true},
    {win:1, home:true},
    {win:0, home:true},
    {win:1, home:false},
    {win:1, home:true}
  ];

  function wasHome(record) { return record.home;} 
  function winValue(record) { return record.win;} 
  


  var settings = {
    sample:gameRecords,
    frequencyThreshold:0,
    frequencyFunction:winValue,
    middlePredicate:wasHome,
    shouldDisplayMiddle:true
  } 

  var udgraph = new UdGraph(settings);
  var graphstr = udgraph.consoleString()

  var summary = udgraph.topValue() + ' / ' + udgraph.bottomValue();
  
  console.log(centerTitle(summary, graphstr)); 
  console.log(graphstr);

}

function centerTitle(title, graphstr) {
  var padding = "";
  //center
  var firstLineLen = graphstr.indexOf("\n");
  var numSpaces = (firstLineLen - title.length) / 2;
  for (var i = 0; i < numSpaces; i++) {
    padding += " ";
  };
  return padding.concat(title);
}

function UdGraph(settings) {
  // TODO: Canvas magic happens here
  //var canvas = document.getElementById();
  this.sample = settings.sample || [];
  this.frequencyThreshold = settings.frequencyThreshold || 0;
  this.frequencyFunction = settings.frequencyFunction 
                        || function(arg) {return arg};
  this.middlePredicate = settings.middlePredicate 
                          || function(arg) {return arg == true};
  this.shouldDisplayMiddle = settings.shouldDisplayMiddle || false;
  
}

UdGraph.prototype.draw = 
function() {
  alert("hi world");
};

UdGraph.prototype.toString =
function() {
  return this.sample.join(", ");
};

UdGraph.prototype.topValue = 
function() {
  var count = 0;
  for (var i = 0; i < this.sample.length; i++) {
    if (this.frequencyFunction(this.sample[i]) > this.frequencyThreshold) count++;
  };
  return count;
}

UdGraph.prototype.bottomValue = 
function() {
  var count = 0;
  for (var i = 0; i < this.sample.length; i++) {
    if (this.frequencyFunction(this.sample[i]) <= this.frequencyThreshold) count++;
  };
  return count;
}

UdGraph.prototype.consoleString =
function() {
  var top = "", middle = "",  bottom = "";
  for (var i = 0; i < this.sample.length; i++) {
    // check for top and bottom
    if (this.frequencyFunction(this.sample[i]) === null) {
      top += " ";
      bottom += " ";
    }
    else if (this.frequencyFunction(this.sample[i]) > this.frequencyThreshold) {
      top    += "|";
      bottom += " ";
    }
    else {
      top    += " "
      bottom += "|"
    }
    
    // Check for middle
    middle += this.middlePredicate(this.sample[i]) ? "-" : " "; 
    }
    
    return this.shouldDisplayMiddle ?
             top.concat('\n', middle, '\n', bottom) :
             top.concat('\n',  bottom);
};
