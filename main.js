const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let running = false;
const directions = ['left' , 'right' , 'up', 'down'];

class Field{
    // insert a two dimensional area and both horizontal and vertical positions for the player
    constructor(area, horizontal, vertical){
        this._area = area;
        this._horizontal = horizontal;
        this._vertical = vertical;
    }

    // print the layout
    print(){
      
        for(const row of this._area){
            console.log(row.join(' '));
        }
        
    }

    get area(){
        return this._area;
    }

    get vertical(){
        return this._vertical;
    }

    get horizontal(){
        return this._horizontal;
    }

    set vertical(position){
        this._vertical = position;
    }

    set horizontal(position){
        this._horizontal = position;
    }

    outOfBounds(){
        if(this._vertical > this._area.length || this._vertical < 0) return true;
        if(this._horizontal > this._area[0].length || this._horizontal < 0) return true;
        return false;
    }


    lost(){

        // return true if player lost(just in case) and return false if didnt lose
        //if the player is out of bounds
        if(this.outOfBounds()){
            console.log(`You are out of bounds, you lost.`);
            running = false;
            return true;
        }

        //if the player fell in a hole
        else if(this._area[this._vertical][this._horizontal] === hole){
            console.log(`You fell in a hole, you lost.`);
            running = false;
            return true;
        }

        return false;
    }

    //returns true if this current location: meaning this veritcal(row) and this column(horziontal are located on a hat)
    won(){
        if(this._area[this._vertical][this._horizontal] === hat ){
            console.log('You won!');
            running = false;
            return true;
        }

        return false;
    }
    

    //just a testing function 
    scanHoles(){
        let holes = [];
        for(let row = 0; row < this._area.length; row++){
            for(let col = 0; col < this._area[row].length; col++){
                if(this._area[row][col] === hole) holes.push({row,col});
            }
        }

        return holes;
    }

    // just a testing function
    winningLocaiton(){
        const row = this._area.findIndex(row => row.includes(hat));
        const col = this._area[row].indexOf(hat);

        return [row,col];

    }


    //directions: up down left right
    move(){
        let direction = prompt(`Where would you like to move?`);
        // make sure the direction is written properly and don't let the player move to an undifined location
        while(direction !== 'string' && !directions.includes(direction)){
            console.log( Error("Write a valid direction, it can be up,down,left and right and must be a String"));
            direction = prompt(`Where would you like to move?`);
        }
        
        //actual movement
        switch(direction){
            case 'up':
                this._vertical -= 1;
                break;

            case 'down':
                this._vertical += 1;
                break;

            case 'left':
                this._horizontal -= 1;
                break;
               
            case 'right':
                this._horizontal += 1;
                break;
            
            default:
                break;



        }

        // if the player is out of bounds, lost function is going to happen and set a message if not the position of the map will be updated
        if(!this.lost()){
            this.won();
            this._area[this._vertical][this._horizontal] = pathCharacter;
            this.print();
        }
     
    }

    static generateField(height, width){
        //1 hat and two or more holes, return a randomized two dimentional array
        const field = Array.from({ length: height }, () =>
            Array.from({ length: width }, () => '░')
          );;
        const minHoles = 2, maxHoles =  Math.ceil((height * width) * 30 / 100);
        console.log(`min holes: ${minHoles}`);
        console.log(`max holes: ${maxHoles}`);

        const holes = Math.floor(Math.random() * maxHoles - minHoles +3); //final number of holes
        //place field characters in the field
        
        field[0][0] = pathCharacter;

        const hatRow = Math.floor(Math.random() * height);
        const hatCol = Math.floor(Math.random() * width);
        
        field[hatRow][hatCol] = hat;
        console.log(`hat row: ${hatRow} hat column: ${hatCol}`);
        //field.push([0,0]);
        let cannotPlace = [ [hatRow,hatCol]]; // an array of poistions where holes cannot be placed
        cannotPlace.push([0,0]); // add the top left corner that holes cannot be placed in
        let holeRow = 0, holeCol = 0;
          console.log(`holes amount ${holes}`);
        // add holes depends on the random number of holes that was chosen
        for(let i = 0; i < holes; i++){

            do{ // random a number between the width of the height of the field that is not already a hat or a hole if not continue randomizing
                holeRow = Math.floor(Math.random() * height);
                holeCol = Math.floor(Math.random() * width);
                console.log(`hole row: ${holeRow} hole column: ${holeCol}`);    

                                                                        // means that the places filled with holes+ one hat + player are filled out
            }while(cannotPlace.includes(holeRow,holeCol) && cannotPlace <= holes+2); 

            //found a number, add it to the array and update the field
            cannotPlace.push(holeRow,holeCol);
            field[holeRow][holeCol] = hole;
        }

        return field;
    }

  
}


//How everything actually works 
function gameLoop(){
    console.log(`welcome to the field game this is your current board:`)
    
    const fieldArea = Field.generateField(8,8);
    let field = new Field(fieldArea, 0 ,0);

    field.print();
    // the game runs only when the player hasnt lost yet(based on the function)
    running = true;

    while(running){
    field.move();
    }
}


//game starts here  
gameLoop();

