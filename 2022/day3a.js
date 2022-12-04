//  Advent of code 2022 - Day 3
//  https://adventofcode.com/2022/day/3

//---------File interface
const f = require('fs');
const readline = require('readline');

var pack_file = './day3_packs.txt';
var packs = readline.createInterface({
    input : f.createReadStream(pack_file)
});

var line_num=0;
packs.on('line', function(text){
    processLine(text, line_num++);
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

var line_bundles = [];
function processLine(line){
    line_bundles.push(line);
    if (line_bundles.length == 3 ){
        var commonLetter = findDups(findDups(line_bundles[0], line_bundles[1]), line_bundles[2]);
        console.log(`Common letter in all three is ${commonLetter}`);

        //Create a string with all the dup letters and clear the bundle array
        all_dup_letters = all_dup_letters.concat(commonLetter);
        line_bundles = [];

    }

};

function findDups(firstString, secondString){
    var dupLetters = "";
    //console.log(`First String:${firstString}(${firstString.length}) Second Half:${secondString}(${secondString.length})`);

    for (let letter of firstString){
        //Figure out if this letter is also in the second pack
        //  but remove duplicates via the dupLetters string
        if (!dupLetters.includes(letter) && secondString.includes(letter)){
            //console.log(`Found dup of ${letter}`);
            dupLetters = dupLetters.concat(letter);
        }
    }

    return (dupLetters);
}

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
