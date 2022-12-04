// https://adventofcode.com/2022/day/1 - Part 2

//Answer...verify after refactoring
//Elf #0 has 73211 calories
//Elf #1 has 71575 calories
//Elf #2 has 69172 calories
//----Top 3 elf calories was 213958

const f = require('fs');
const readline = require('readline');

var user_file = './day1.txt';
var r = readline.createInterface({
    input : f.createReadStream(user_file)
});

var curr_elf_num=0;
var curr_elf_calories=0;
var max_calories=0;
const TOP_NUM_RESULTS=3;
const elf_array=[0,0,0];

r.on('line', function(text){
    processLine(text);
});
r.on('close', function(text){
    nextElf();
    processResult();
});

function processResult(){
    var top_count_total=0;

    elf_array.forEach((elf_total) => {
        top_count_total += elf_total;
        console.log(`A top elf ${elf_total} calories`);
    });
    console.log(`----Top ${elf_array.length} elf calories was ${top_count_total}`);
}

function processLine(text){
    //Check if line is blank, meaning new elf
    if (text.length === 0){
        //Blank line means new elf
        nextElf();
    }else{
        //Add the curr line calories to the curr elf's total
        curr_elf_calories += parseInt(text);
    }
};

function nextElf(){
    console.log(`Elf #${curr_elf_num} had ${curr_elf_calories} calories`);

    //We are keeping the top values, so check if current is bigger
    //  than the smallest in the top list
    if (curr_elf_calories>elf_array[TOP_NUM_RESULTS-1]){
        console.log(`Elf #${curr_elf_num} has new top score of ${curr_elf_calories}`);
        elf_array[TOP_NUM_RESULTS-1] = curr_elf_calories;
        
        //This is a bit expensive and I should just insert it into the right position
        //  but this is a small array, so oh well.
        elf_array.sort(compareFn);
    }

    //Reset vars for next elf
    curr_elf_calories=0;
    curr_elf_num++;
};

function compareFn(a, b) {
    //this ensures that sort puts the largest at the front
    return b-a;
}
