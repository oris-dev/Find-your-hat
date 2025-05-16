import { Field } from "./game.js";

const hat = '^';
const hole = 'O';
const grass = '░';
const player = '*';
let running = true;

// Create a 5x5 grid and starting position of 0,0
const area = Field.generateField(5, 5);
const gameArea = new Field(area, 0, 0);
let boardCreated = false;

const gameBoard = document.getElementById("game-board");
const cells = [];

let playerPos = {
    x: 0,
    y: 0
};

function createBoard() {

    if (!boardCreated) {


        for (let row = 0; row < area.length; row++) {
            const cellRow = [];

            for (let col = 0; col < area[row].length; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');

                switch (area[row][col]) {
                    case hat: cell.classList.add('hat'); break;
                    case hole: cell.classList.add('hole'); break;
                    case player: cell.classList.add('player'); break;
                    case grass: cell.classList.add('grass'); break;
                    default: cell.classList.add('dirt'); break;
                }

                gameBoard.appendChild(cell);
                cellRow.push(cell);
            }

            cells.push(cellRow);
            gameArea.cells = cells;
            boardCreated = true;
        }
    } else {
        alert('board has already been created');
    }




}


function restartBoard(){
    
}


function initListeners() {
    document.getElementById("create_board").addEventListener("click", createBoard);
    
    
    //game loop
    document.addEventListener("keypress", (e) => {
  
        if (running) {

            gameArea.move(e);

            if(gameArea.lost()){
                running = false;
                alert('You Lost');
            } 
            else if(gameArea.won()){
                running = false;
                alert('You won');
            } 
        }



    });

    //restart game
    document.addEventListener("click", restartBoard);

}

// Add event listener once DOM is fully loaded
document.addEventListener("DOMContentLoaded", initListeners);

