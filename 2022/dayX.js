//  Advent of code 2022 - Day X
//  https://adventofcode.com/2022/day/X

//---------File interface
const f = require('fs');
const readline = require('readline');

var pack_file = './day5.txt';
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
    console.log(`Final result is ${}`);
}

function processLine(line){
    console.log(`Line is ${}`);    

};
