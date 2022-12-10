//  Advent of code 2022 - Day 7
//  https://adventofcode.com/2022/day/7

//---------File interface
const f = require('fs');
const readline = require('readline');

var in_file = './day7.txt';
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

//---------File System Node
const FsType = {
    Dir: 'Dir',
    File: 'File',
  };
class FsNode {
    type = FsType.Dir;  //FsType of Dir | File
    fname = "";         //Name of dir or file
    size = 0;          //Size of file or a files under this dir
    children = [];      //Child directories
    parent = null;      //Parent directory

    constructor(fname, type, parent=null, size=0){
        this.fname = fname;
        this.type = type;
        this.parent = parent;
        this.size = size;
    }

    subDir(dir){
        for (const child of this.children){
            //console.log(`Checking if subdir ${JSON.stringify(child.fname)} is ${JSON.stringify(dir)}`);
            if(child.fname == dir){
                //console.log(`Found match`);
                return(child);
            }
        }
        //console.log(`Can't find dir of ${dir} under ${this.fname}`);
        return null;
    }

    calcSize(){
        //Recursively go through the tree to calc the overall size
        if(this.type == FsType.Dir){
            for (const child of this.children){
                this.size += child.calcSize();
            }
        }
        return(this.size);
    }

    findDirClosestToSize(desiredSize, currBestCandidate=Number.MAX_SAFE_INTEGER){
        //Need to find the subdir that is at least the desiredSize
        // but we want the one closest to it
        if(this.type == FsType.Dir){
            //Recursively go through all the subdirs and total those
            //  meeting the maxSize constraint
            if(this.size >= desiredSize &&
                this.size < currBestCandidate){
                //Found a new closest match
                currBestCandidate = this.size; 
            }
            for (const child of this.children){
                currBestCandidate = child.findDirClosestToSize(desiredSize, currBestCandidate);
            }
        }
        return(currBestCandidate);
    }

    sumDirsWithSizeUnder(maxSize){
        var running_total=0;
        if(this.type == FsType.Dir){
            //Recursively go through all the subdirs and total those
            //  meeting the maxSize constraint
            if(this.size <= maxSize){
                running_total += this.size; 
            }
            for (const child of this.children){
                running_total += child.sumDirsWithSizeUnder(maxSize);
            }
        }
        return(running_total);
    }

    printDir(indent = ""){
        const fsname = (this.type == FsType.Dir)? "/"+this.fname : " "+this.fname;
        console.log(`${indent} ${fsname} - ${this.size}`);
        for (const child of this.children){ 
            child.printDir(indent + " ");
        }
    }
}
var top_root = new FsNode("",FsType.Dir);  //Start one level above the root dir
var curr_dir = top_root;
curr_dir.children.push(new FsNode(String("/"),FsType.Dir,curr_dir)); //Insert the '/' into the top root

function processFinish(){
    const DIR_UNDER_SIZE = 100000;
    const TOTAL_DISK_SPACE = 70000000;
    const UNUSED_SPACE_NEEDED = 30000000;
    top_root.calcSize();
    top_root.printDir();
    console.log(`Final sum under 100K ${top_root.sumDirsWithSizeUnder(DIR_UNDER_SIZE)}`);
    const space_to_free = UNUSED_SPACE_NEEDED-(TOTAL_DISK_SPACE-top_root.size);
    console.log(`Best dir option to free ${space_to_free} is ${top_root.findDirClosestToSize(space_to_free)}`);
}

//Example lines
//  $ cd /
//  $ ls
//  dir a
//  14848514 b.txt
//  $ cd ..
//  14848514 b.txt
function processLine(line, line_num){
    console.log(`Line ${line_num}: ${line}`);
    const splitLine = line.split(" ");

    if(line.startsWith("$ cd ..")){
        //Up a directory...calc the tree size first
        curr_dir = curr_dir.parent;
    }else if(line.startsWith("$ cd")){
        //Down a directory
        const subDir1 = splitLine[2];
        console.log(`Process CD to ${subDir1}`);
        curr_dir = curr_dir.subDir(subDir1);
    }else if(line.startsWith("dir")){
        //Assuming we are in an 'ls' for the curr dir
        //  and learning about a new dir
        curr_dir.children.push(new FsNode(splitLine[1], FsType.Dir, curr_dir));
    }else if(line.startsWith("$ ls")){
    }else{
        //The only option left is that this is a file
        curr_dir.children.push(new FsNode(splitLine[1], FsType.File, curr_dir, parseInt(splitLine[0])));
    }



};
