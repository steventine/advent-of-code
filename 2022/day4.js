//  Advent of code 2022 - Day 4
//  https://adventofcode.com/2022/day/4

//---------File interface
const f = require('fs');
const readline = require('readline');

var pack_file = './day4.txt';
var packs = readline.createInterface({
    input : f.createReadStream(pack_file)
});

var line_num=0;
packs.on('line', function(text){
    processLine(text, line_num++);
});
packs.on('close', function(text){
    processFinish();
});

//---------File handling
var full_overlap_count=0;
var partial_overlap_count=0;

function processFinish(topCount){
    console.log(`Full overlap count is ${full_overlap_count}`);
    console.log(`Partial overlap count is ${full_overlap_count + partial_overlap_count}`);
}

function processLine(line){
    //Lines look like:
    //  2-4,6-8 (i.e. <num>-<num>,<num>-<num>)
    var keyChar = line.indexOf('-'); //First num end at "-"
    const firstNum = parseInt(line.substring(0,keyChar));
    line = line.substring(keyChar+1);         //Now remove up to "-"
    //console.log(line);

    keyChar = line.indexOf(",");     //Second num ends at ","
    const secondNum = parseInt(line.substring(0,keyChar));
    line = line.substring(keyChar+1);         //Now remove up to ","

    var keyChar = line.indexOf('-'); //First num end at "-"
    const thirdNum = parseInt(line.substring(0,keyChar));
    line = line.substring(keyChar+1);         //Now remove up to "-"

    const fourthNum = parseInt(line);  //The remainder

    console.log(`${firstNum}, ${secondNum}, ${thirdNum}, ${fourthNum}`);
    if (isFullyContained(firstNum, secondNum, thirdNum, fourthNum)){
        console.log(`Fully contained`);
        full_overlap_count++;
    }else if (isAnyOverlap(firstNum, secondNum, thirdNum, fourthNum)){
        console.log(`Partially contained`);
        partial_overlap_count++;
    }
    

};

//Returns if one range if fully contained in the other
function isFullyContained(first, second, third, fourth){ 
    return((first <= third && second >= fourth) ||
           (first >= third && second <= fourth));
};

//Returns if one range overlaps at all with the other
function isAnyOverlap(first, second, third, fourth){ 
    return((first <= third && second >= third) ||
           (first <= fourth && second >= fourth));
};
