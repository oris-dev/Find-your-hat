import { Field } from "./game.js";

let running = true;

// Create a 5x5 grid and starting position of 0,0
let area = Field.generateField(5, 5);
let gameArea = new Field(area, 0, 0);
let boardCreated = false;

const gameBoard = document.getElementById("game-board");
const cells = [];



function createBoard() {

    if (!boardCreated) {


        for (let row = 0; row < area.length; row++) {
            const cellRow = [];

            for (let col = 0; col < area[row].length; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');

                switch (area[row][col]) {
                    case Field.hat: cell.classList.add('hat'); break;
                    case Field.hole: cell.classList.add('hole'); break;
                    case Field.player: cell.classList.add('player'); break;
                    case Field.grass: cell.classList.add('grass'); break;
                    default: cell.classList.add('dirt'); break;
                }

                gameBoard.appendChild(cell);
                cellRow.push(cell);
            }

            cells.push(cellRow);
            gameArea.cells = cells;
          
        }

          boardCreated = true;
          console.log(gameArea.print());

    } else {
        alert('board has already been created');
    }




}


function restartBoard() {

    //regenerating the field
    area = Field.generateField(5,5);
     gameArea = new Field(area, 0, 0);


    //go over each cell and recreate the visuals based on the new field
    for (let row = 0; row < cells.length; row++) {
        for (let col = 0; col < cells[row].length; col++) {
            const cell = cells[row][col];

            
            switch (area[row][col]) {
                case Field.hat: cell.classList.add('hat'); break;
                case Field.hole: cell.classList.add('hole'); break;
                case Field.player: cell.classList.add('player'); break;
                case Field.grass: cell.classList.add('grass'); break;
                default: cell.classList.add('dirt'); break;
                
            }
        }
    }

}


function initListeners() {
    document.getElementById("create_board").addEventListener("click", createBoard);


    //game loop
    document.addEventListener("keypress", (e) => {

        if (running) {

            gameArea.move(e);

            if (gameArea.lost()) {
                running = false;
                let alertMsg = `You lost`;
                //assaigning losing cause 
                const outOfBounds = gameArea.outOfBounds();
                outOfBounds ? alertMsg += ` you were out of bounds` : alertMsg = ` You fell on a hole` ;
                alertMsg += `/n You were on horizontal: ` + gameArea.horizontal + ` vertical: ` + gameArea.vertical; 


                alert(alertMsg);
             
            }
            else if (gameArea.won()) {
                running = false;
                alert('You won');
            }
        }



    });

    //restart game
   document.getElementById('restart').addEventListener("click", restartBoard);

}

// Add event listener once DOM is fully loaded
document.addEventListener("DOMContentLoaded", initListeners);

