//  Advent of code 2022 - Day 5
//  https://adventofcode.com/2022/day/5

// Sample Input
//    [D]    
//[N] [C]    
//[Z] [M] [P]
// 1   2   3 
//
//move 1 from 2 to 1
//move 3 from 1 to 3
//move 2 from 2 to 1
//move 1 from 1 to 2

//---------File interface
const f = require('fs');

var in_file = './day5.txt';
var readable = f.createReadStream(in_file);

const NUM_OF_STACKS=9;
//Create the array of stacks
var stacks={};
for(let i=1;i<=NUM_OF_STACKS;i++){
    stacks[i]=[];
}

const PHASE_STACKS=1;
const PHASE_MOVES=2;
var phase=PHASE_STACKS;
packs.on('line', function(text){
    //First set of lines are stacks
    //Next set is the moves
    if(phase===PHASE_STACKS){
        processStackLine(text);
    }else{
        processMoveLine(text);
    }
});
packs.on('close', function(text){
    processFinish();
});

//---------File handling
function processFinish(topCount){
    console.log(`Final stacks are ${JSON.stringify(stacks)}`);
    console.log(`Top element are:}`);
    for(let i=1;i<=NUM_OF_STACKS;i++){
        process.stdout.write(stacks[i].pop());
    }
    console.log("");  //Newline
}

//Stack lines look like:
//    [D]    
//[N] [C]    
//[Z] [M] [P]
// 1   2   3 
//(but there can be up to 9 stacks)
const STACK1_OFFSET=1;
const NUM_CHARS_BETWEEN_STACKS=4;
function getStackCharOffset(stackNum){
    return (STACK1_OFFSET + ((stackNum-1)*NUM_CHARS_BETWEEN_STACKS)) };
function processStackLine(line){
    console.log(`Line is ${line}`); 

    if(line[getStackCharOffset(1)] == '1' && 
       line[getStackCharOffset(2)] == '2' && 
       line[getStackCharOffset(3)] == '3'){
        //We've reached the end (with 1 2 3)
        //Move to the next phase
        console.log(`Moving to MOVE phase`);

        //Reverse the order of the elements (as the last
        //  item added is actually at the bottom of the stack)
        for(let i=1;i<=NUM_OF_STACKS;i++){
            stacks[i].reverse();
        }
        console.log(`Stacks are ${JSON.stringify(stacks)}`);
        phase=PHASE_MOVES;
    }else{
        //Push the items to the appropriate stack
        for(let i=1;i<=NUM_OF_STACKS;i++){
            pushIfPresent(stacks[i],line[getStackCharOffset(i)]);
        }
        console.log(`Stacks are ${JSON.stringify(stacks)}`);
    }

};

let pushIfPresent = (stack, str) => {
    if(!!str && str != ' '){
        stack.push(str);
    }
};

//Move lines look like:
//move 1 from 2 to 1
//move 3 from 1 to 3
//move 2 from 2 to 1
//move 1 from 1 to 2
const MOVE_COUNT_OFFSET=1;
const MOVE_FROM_OFFSET=3;
const MOVE_TO_OFFSET=5;
function processMoveLine(line){
    console.log(`Line is ${line}`);
    
    //Ignore the blank line
    const lineArray = line.split(" ");
    if(line.length >= MOVE_TO_OFFSET){
        const lineCount = parseInt(lineArray[MOVE_COUNT_OFFSET]);
        const lineFrom = parseInt(lineArray[MOVE_FROM_OFFSET]);
        const lineTo = parseInt(lineArray[MOVE_TO_OFFSET]);
        var items = [];
        console.log(`Moving ${lineCount} items from ${lineFrom} to ${lineTo}`);

        for(let i=0; i<lineCount; i++){
            items.push(stacks[lineFrom].pop());
        }
        for(let i=0; i<lineCount; i++){
            stacks[lineTo].push(items.pop());
        }
        console.log(`Result is ${JSON.stringify(stacks)}`);


    }

};
