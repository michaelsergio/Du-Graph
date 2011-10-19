
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

