//  Advent of code 2022 - Day X
//  Generic file for processing lines of text
//  https://adventofcode.com/2022/day/X

//---------File interface
const f = require('fs');
const readline = require('readline');

var in_file = './day5.txt';
var lines = readline.createInterface({
    input : f.createReadStream(in_file)
});

var line_num=0;
lines.on('line', function(text){
    processLine(text, line_num++);
});
lines.on('close', function(text){
    processFinish();
});

//---------File handling
var final_value=0;

function processFinish(){
    console.log(`Final result is ${final_value}`);
}

function processLine(line, line_num){
    console.log(`Line ${line_num}: ${line}`);    

};
