// https://adventofcode.com/2022/day/2 - Part 1

const f = require('fs');
const readline = require('readline');

//A=Rock (score=1)
//B=Paper (score=2)
//C=Scissor (score=3)
//
//X=Lose
//Y=Draw
//Z=Win
//
//Score is my value + 0(loss) or 3(tie) or 6(win) 
const rps_score = {
    "A X": 3+0,  //rock, lose(0), scissors (3)
    "A Y": 1+3,  //rock, draw(3), rock (1)
    "A Z": 2+6,  //rock, win(6),  paper (2)
    "B X": 1+0,  //paper, lose(0), rock (1)
    "B Y": 2+3,  //paper, draw(3), paper (2)
    "B Z": 3+6,  //paper, win(6), scissors (3)
    "C X": 2+0,  //scissors, lose(0), paper (2)
    "C Y": 3+3,  //scissors, draw(3), scissors (3)
    "C Z": 1+6   //scissors, win(6), rock (1)
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
    processRpsFinish(TOP_NUM_RESULTS);
});

function processRpsFinish(topCount){
    console.log(`Total RPS score was ${curr_rps_score}`);
}

function processRpsLine(rpsLine){
    const score = rps_score[rpsLine];

    console.log(`Game of #${rpsLine} scored ${score}`);
    curr_rps_score += score;
};


