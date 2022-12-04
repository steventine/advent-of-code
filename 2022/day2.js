// https://adventofcode.com/2022/day/2 - Part 1

const f = require('fs');
const readline = require('readline');

//A=X=Rock (score=1)
//B=Y=Paper (score=2)
//C=Z=Scissor (score=3)
//
//Score is my value + 0(loss) or 3(tie) or 6(win) 
const rps_score = {
    "A X": 1+3,
    "A Y": 2+6,
    "A Z": 3+0,
    "B X": 1+0,
    "B Y": 2+3,
    "B Z": 3+6,
    "C X": 1+6,
    "C Y": 2+0,
    "C Z": 3+3
};

var rps_file = './rps.txt';
var rps = readline.createInterface({
    input : f.createReadStream(rps_file)
});

//--- Rock Paper Scissors 
var curr_rps_score=0;

rps.on('line', function(text){
    processRpsLine(text);
});
rps.on('close', function(text){
    processRpsFinish();
});

function processRpsFinish(){
    console.log(`Total RPS score was ${curr_rps_score}`);
}

function processRpsLine(rpsLine){
    const score = rps_score[rpsLine];

    console.log(`Game of #${rpsLine} scored ${score}`);
    curr_rps_score += score;
};

