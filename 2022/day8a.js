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
    var highest_scenic_score=0;
    //console.log(`Compare ${tree_grid[4][4]} to ${tree_grid[4][3]} is ${tree_grid[4][3] > tree_grid[4][3]}`)

    //Walk through each row & col, skip row/col 0 and last row/col
    //  as they are all visible
    for (let i=1; i<tree_grid.length-1; i++){
        for (let j=1; j<tree_grid[i].length-1; j++){
            console.log(`--Processing [${i}][${j}] ${tree_grid[i][j]}`);
            var this_scenic_score = viewLeftCount(tree_grid,i,j) * viewRightCount(tree_grid,i,j) * viewTopCount(tree_grid,i,j) * viewBottomCount(tree_grid,i,j);

            if(this_scenic_score > highest_scenic_score){
                highest_scenic_score = this_scenic_score;
                console.log(`${tree_grid[i][j]} is new highest at ${highest_scenic_score}!`);
            }
        }   
    }
    console.log(`Highest scenic score is ${highest_scenic_score}`);
}

function viewLeftCount(tree_grid, i, j){
    var check_tree = tree_grid[i][j];
    var tree_count = 0;
    for(j--;j>=0;j--){
        console.log(`Left check for [${i}] [${j}]`);
        tree_count++;
        if(check_tree <= tree_grid[i][j]){
            return(tree_count);
        }
    }
    return(tree_count);
}

function viewRightCount(tree_grid, i, j){
    var check_tree = tree_grid[i][j];
    var tree_count = 0;
    for(j++;j<tree_grid[i].length;j++){
        console.log(`Right check for [${i}] [${j}]`);
        tree_count++;
        if(check_tree<=tree_grid[i][j]){
            return(tree_count);
        }
    }
    return(tree_count);
}

function viewTopCount(tree_grid, i, j){
    //console.log(`Top check for ${i} ${j}`);
    var check_tree = tree_grid[i][j];
    var tree_count = 0;
    for(i--;i>=0;i--){
        console.log(`Top check for [${i}] [${j}]`);
        tree_count++;
        if(check_tree<=tree_grid[i][j]){
            return(tree_count);
        }
    }
    return(tree_count);
}

function viewBottomCount(tree_grid, i, j){
    var check_tree = tree_grid[i][j];
    var tree_count = 0;
    for(i++;i<tree_grid.length;i++){
        console.log(`Bottom check for [${i}] [${j}]`);
        tree_count++;
        if(check_tree<=tree_grid[i][j]){
            return(tree_count);
        }
    }
    return(tree_count);
}


function processLine(line, line_num, tree_grid){
    //This pains me a bit to read the entire file into an array
    //  but I can't think of an easy way to do this on-the-fly

    //console.log(`Line ${line_num}: ${line}`);
    tree_grid.push(line);
};
