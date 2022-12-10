//  Advent of code 2022 - Day X
//  https://adventofcode.com/2022/day/6

//---------File interface
const f = require('fs');

var in_file = './day6.txt';
var readable = f.createReadStream(in_file);

//Create the array of chars
var chars=Array(14);
var currCharNum=1;

readable.on('readable', function(){
    var in_char;
    while (null !== (in_char = readable.read(1))){
        processChar(in_char, currCharNum++);
    }
});
readable.on('close', function(text){
    processFinish();
});

//---------File handling
function processFinish(charNum){
    console.log(`Final result is ${charNum}`);
    process.exit();
};

function processChar(in_char, charNum){
    console.log(`Char is ${in_char}`); 
    chars.push(in_char.toString()); //Add to the end of the array
    chars.shift();       //Remove from the start of the array

    if(charNum>3 && noDups(chars)){
        processFinish(charNum);
    }

};

function noDups(charArray){
    console.log(`Checking all ${charArray}`);

    for(let i=0; i<charArray.length; i++){
        for(let j=i+1; j<charArray.length; j++){
            console.log(`Comparing ${charArray[i]} == ${charArray[j]}`)
            if(charArray[i] == charArray[j]){
                console.log(`Equal`);
                return(false);
            }
        }
    }
    return(true);
};