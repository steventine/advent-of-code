// https://adventofcode.com/2022/day/1 - Part 1

const f = require('fs');
const readline = require('readline');

var user_file = './day1.txt';
var r = readline.createInterface({
    input : f.createReadStream(user_file)
});

var curr_elf_num=0;
var curr_elf_calories=0;
var max_calories=0;

r.on('line', function(text){
    processLine(text);
});
r.on('close', function(text){
    nextElf();
    console.log(`Top elf calories was ${max_calories}`);
});


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

    if (curr_elf_calories>max_calories){
        console.log(`Elf #${curr_elf_num} has new max of ${curr_elf_calories}`);
        max_calories = curr_elf_calories;
    }

    //Reset vars for next elf
    curr_elf_calories=0;
    curr_elf_num++;
};
