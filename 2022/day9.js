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
    console.log(`Total Positions is ${JSON.stringify(tail_positions)}`);
    console.log(`Total Count is ${Object.keys(tail_positions).length}`);
}

var head={x:0, y:0};
var tail={x:0, y:0};
var tail_positions={};

function processLine(line, line_num){
    console.log(`Line ${line_num}: ${line}`);    
    var direction=line.split(" ")[0];
    for(let dir_value=line.split(" ")[1];dir_value>0;dir_value--){
        switch(direction){
            case 'R':
                head.x++;
                break;
            case 'L':
                head.x--;
                break;
            case 'U':
                head.y++;
                break;
            case 'D':
                head.y--;
                break;
        }
        moveTail(head, tail);
        tail_positions[`${tail.x} ${tail.y}`]=true;
    }

};

function moveTail(hd, tl){
    if(Math.abs(hd.x-tl.x)>1){
        tl.y=hd.y;
        tl.x++;
        if(Math.abs(hd.x-tl.x)>1){
            tl.x-=2;
        }
    }else if(Math.abs(hd.y-tl.y)>1){
        tl.x=hd.x;
        tl.y++;
        if(Math.abs(hd.y-tl.y)>1){
            tl.y-=2;
        }
    }

}