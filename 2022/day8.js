//  Advent of code 2022 - Day 8
//  Generic file for processing lines of text
//  https://adventofcode.com/2022/day/8

//---------File interface
const f = require('fs');
const readline = require('readline');

var in_file = './2022/day8.txt';
var lines = readline.createInterface({
    input : f.createReadStream(in_file)
});

var line_num=0;
var tree_array=[];
lines.on('line', function(text){
    processLine(text, line_num++, tree_array);
});
lines.on('close', function(tree_grid){
    processFinish(tree_array);
});

//---------File handling
var final_value=0;

//Sample Array
//     [0][1][2][3][4]
// [0]  3  0  3  7  3
// [1]  2  5  5  1  2
// [2]  6  5  3  3  2
// [3]  3  3  5  4  9
// [4]  3  5  3  9  0
function processFinish(tree_grid){
    console.log(`Cols has length ${tree_grid.length}`);
    console.log(`Row 1 has length ${tree_grid[0].length}`);
    var tree_count=0;
    //console.log(`Compare ${tree_grid[4][4]} to ${tree_grid[4][3]} is ${tree_grid[4][3] > tree_grid[4][3]}`)

    //Walk through each row & col, skip row/col 0 and last row/col
    //  as they are all visible
    for (let i=1; i<tree_grid.length-1; i++){
        for (let j=1; j<tree_grid[i].length-1; j++){
            //Check tree_grid[i][j]
            console.log(`--Processing [${i}][${j}] ${tree_grid[i][j]}`);
            if(isLeftClear(tree_grid,i,j) ||
               isRightClear(tree_grid,i,j) ||
               isTopClear(tree_grid,i,j) ||
               isBottomClear(tree_grid,i,j)){
                console.log(`${tree_grid[i][j]} is clear!`);
                tree_count++;
            }
        }   
    }
    //Add on all the outside trees
    tree_count += ((tree_grid.length-2)*2) + (tree_grid[0].length*2);
    console.log(`Total visible trees is ${tree_count}`);
}

function isLeftClear(tree_grid, i, j){
    var check_tree = tree_grid[i][j];
    for(j--;j>=0;j--){
        console.log(`Left check for [${i}] [${j}]`);
        if(check_tree <= tree_grid[i][j]){
            return(false);
        }
    }
    return(true);
}

function isRightClear(tree_grid, i, j){
    var check_tree = tree_grid[i][j];
    for(j++;j<tree_grid[i].length;j++){
        console.log(`Right check for [${i}] [${j}]`);
        if(check_tree<=tree_grid[i][j]){
            return(false);
        }
    }
    return(true);
}

function isTopClear(tree_grid, i, j){
    //console.log(`Top check for ${i} ${j}`);
    var check_tree = tree_grid[i][j];
    for(i--;i>=0;i--){
        console.log(`Top check for [${i}] [${j}]`);
        if(check_tree<=tree_grid[i][j]){
            return(false);
        }
    }
    return(true);
}

function isBottomClear(tree_grid, i, j){
    var check_tree = tree_grid[i][j];
    for(i++;i<tree_grid.length;i++){
        console.log(`Bottom check for [${i}] [${j}]`);
        if(check_tree<=tree_grid[i][j]){
            return(false);
        }
    }
    return(true);
}


function processLine(line, line_num, tree_grid){
    //This pains me a bit to read the entire file into an array
    //  but I can't think of an easy way to do this on-the-fly

    //console.log(`Line ${line_num}: ${line}`);
    tree_grid.push(line);
};
