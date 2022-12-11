//  Advent of code 2022 - Day 9
//  Generic file for processing lines of text
//  https://adventofcode.com/2022/day/X

//---------File interface
const { dir } = require('console');
const f = require('fs');
const readline = require('readline');

var in_file = './day9.txt';
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

//---------Sample List
// R 4
// U 4
// L 3
// D 1
// R 4
// D 1
// L 5
// R 2

function processFinish(){
    //console.log(`Total Positions is ${JSON.stringify(tail_positions)}`);
    console.log(`Total Count is ${Object.keys(tail_positions).length}`);
}

var tail_positions={};
const NUM_KNOTS=10;
var knots=[];
for(i=0;i<NUM_KNOTS;i++){
    knots[i]={x:0,y:0};
}

function processLine(line, line_num){
    //console.log(`Line ${line_num}: ${line}`);    
    var direction=line.split(" ")[0];
    for(let dir_value=line.split(" ")[1];dir_value>0;dir_value--){
        switch(direction){
            case 'R':
                knots[0].x++;
                break;
            case 'L':
                knots[0].x--;
                break;
            case 'U':
                knots[0].y++;
                break;
            case 'D':
                knots[0].y--;
                break;
        }
        for(let i=1;i<NUM_KNOTS;i++){
            moveTail(knots[i-1], knots[i]);
            //console.log(`Knot ${i} is at ${knots[i].x} ${knots[i].y}`)
        }
        console.log(`[${knots[NUM_KNOTS-1].x}, ${knots[NUM_KNOTS-1].y}] (following [${knots[NUM_KNOTS-2].x}, ${knots[NUM_KNOTS-2].y}] )`);
        tail_positions[`${knots[NUM_KNOTS-1].x} ${knots[NUM_KNOTS-1].y}`]=true;

    }

};

function moveTail(head, tail){
    if(Math.abs(head.x-tail.x)>1 && Math.abs(head.y-tail.y)>1){
        tail.x++;
        if(Math.abs(head.x-tail.x)>1){
            tail.x-=2;
        }
        tail.y++;
        if(Math.abs(head.y-tail.y)>1){
            tail.y-=2;
        }
    }else if(Math.abs(head.x-tail.x)>1){
        tail.y=head.y;
        tail.x++;
        if(Math.abs(head.x-tail.x)>1){
            tail.x-=2;
        }
    }else if(Math.abs(head.y-tail.y)>1){
        tail.x=head.x;
        tail.y++;
        if(Math.abs(head.y-tail.y)>1){
            tail.y-=2;
        }
    }

}