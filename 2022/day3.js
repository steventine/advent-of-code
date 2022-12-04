// https://adventofcode.com/2022/day/3 - Part 1

//---------File interface
const f = require('fs');
const readline = require('readline');

var pack_file = './day3_packs.txt';
var packs = readline.createInterface({
    input : f.createReadStream(pack_file)
});

packs.on('line', function(text){
    processLine(text);
});
packs.on('close', function(text){
    processFinish();
});

//---------File handling
var curr_priority_score=0;
var all_dup_letters='';

function processFinish(topCount){
    console.log(`All dups are ${all_dup_letters}`);
    for (let letter of all_dup_letters){
        const letterVal = getLetterVal(letter);
        console.log(`Score of ${letter} is ${letterVal}`);
        curr_priority_score += letterVal;
    }

    console.log(`Total score is ${curr_priority_score}`);
}

function processLine(line){
    var score=0;
    const firstHalf=line.substring(0,line.length/2);
    const secondHalf=line.substring(line.length/2);
    var dupLetters='';

    console.log(`First Half:${firstHalf}(${firstHalf.length}) Second Half:${secondHalf}(${secondHalf.length})`);

    for (let letter of firstHalf){
        //Figure out if this letter is also in the second pack
        //  but remove duplicates via the dupLetters string
        if (!dupLetters.includes(letter) && secondHalf.includes(letter)){
            console.log(`Found dup of ${letter}`);
            dupLetters = dupLetters.concat(letter);
        }
    }

    //Create a string with all the dup letters
    all_dup_letters = all_dup_letters.concat(dupLetters);
};

//a=1
//z=26
//A=27
//...
function getLetterVal(letter){
    const letterA = "A".charCodeAt(0);  //Comes before lower case...has score of '27'
    const lettera = "a".charCodeAt(0);  //Comes after upper case...has score of '1'
    const letterVal = letter.charCodeAt(0);

    if(letterVal >= lettera){
        return(letterVal - lettera + 1);
    }else{
        return(letterVal - letterA + 27);
    }
}
