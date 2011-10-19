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
