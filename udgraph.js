function UdGraph(settings) {
  // TODO: Canvas magic happens here
  //var canvas = document.getElementById();
  this.sample = settings.sample || [];
  this.frequencyThreshold = settings.frequencyThreshold || 0;
  this.frequencyFunction = settings.frequencyFunction 
                        || function(arg) {return arg};
  this.linePredicate = settings.linePredicate || null;
  this.middlePredicate = settings.middlePredicate 
                          || function(arg) {return arg == true};
  this.shouldDisplayMiddle = settings.shouldDisplayMiddle || false;
  this.summary = settings.summary || true;
  
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

UdGraph.prototype.output =
function(id, width, height) {
  var paper = Raphael(id, width, height);

  var lineWidth = 1;
  var lineHeight = 10 * lineWidth;

  var spacing = 4;
  var summarySpacing = 6;

  var roundedCorners = 0;

  var middleHeight = lineWidth ;

  var startingPoint = 5;

  var pencilX = startingPoint;
  var pencilY = height / 2.0;

  for (var i = 0; i < this.sample.length; i++) {
    // check for top and bottom
    if (this.linePredicate && this.linePredicate(this.sample[i])) {
      // Make the red short whisker
    }
    else {
      if (this.frequencyFunction(this.sample[i]) > this.frequencyThreshold) {
        paper.rect(pencilX, pencilY + lineHeight, 
                   lineWidth, lineHeight)
                  .attr("fill","#000")
                  .attr("stroke-width", 0);

      }
      else {
        paper.rect(pencilX, pencilY, 
                   lineWidth, lineHeight, roundedCorners)
                   .attr({fill: "#000"})
                   .attr("stroke-width", 0);
      }
    }
    
    // Check for middle
    if (this.shouldDisplayMiddle &&
        this.middlePredicate(this.sample[i])) {
      paper.rect(pencilX, pencilY + lineHeight, 
                 lineWidth + spacing, middleHeight, roundedCorners)
                 .attr({fill: "#000"})
                 .attr("stroke-width", 0);
    }

    pencilX += lineWidth + spacing;
  };
  
  if (this.summary) {
    paper.text(pencilX + summarySpacing, pencilY + lineHeight / 2 ,
               this.topValue());
    paper.text(pencilX + summarySpacing, pencilY + 1.5 * lineHeight ,
               this.bottomValue());
  }

}
