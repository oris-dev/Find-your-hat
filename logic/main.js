import { Field } from "./game.js";

let running = true;

// Create a 5x5 grid and starting position of 0,0


let width = 5; let height = 5;
let horiztonalPos = 0, verticalPos = 0;
let area = Field.generateArea(height, width, horiztonalPos, verticalPos);
let gameArea = new Field(area, horiztonalPos, verticalPos);
let boardCreated = false;
let wins = 0;
let loses = 0;

const gameBoard = document.getElementById("game-board");
const winCounter = document.getElementById('wins');
const loseCounter = document.getElementById('losses');
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

    //remove all classes from every cell
    for (let row = 0; row < cells.length; row++) {
        for (let col = 0; col < cells[row].length; col++) {
            const cell = cells[row][col];
            cell.classList.remove(...cell.classList);
            cell.classList.add('cell');
        }
    }



    //regenerating the field and restarting the running boolean
    area = Field.generateArea(width, height);
    gameArea = new Field(area, horiztonalPos, verticalPos);
    gameArea.cells = cells;
    running = true;

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

    gameArea.print();



}


function initListeners() {

    // add text to counters


    document.getElementById("create_board").addEventListener("click", createBoard);


    //game loop
    document.addEventListener("keypress", (e) => {

        if (running) {

            gameArea.move(e);

            if (gameArea.lost()) {
                loses++;
                loseCounter.textContent = loses;
                running = false;
                let alertMsg = `You lost`;
                //assaigning losing cause 
                const outOfBounds = gameArea.outOfBounds();
                outOfBounds ? alertMsg += ` you were out of bounds` : alertMsg = ` You fell on a hole`;
                alertMsg += `/n You were on horizontal: ` + gameArea.horizontal + ` vertical: ` + gameArea.vertical;


                alert(alertMsg);

            }
            else if (gameArea.won()) {
                wins++;
                winCounter.textContent = wins;
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


