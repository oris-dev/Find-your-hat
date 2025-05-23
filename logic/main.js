import { Field } from "./game.js";

let running = true;

// getting elements from the main page 

const holeSlider = document.getElementById("hole-slider");
const holePercentLabel = document.getElementById("hole-percent");
const sizeSlider = document.getElementById("size-slider");
const sizeLabel = document.getElementById("size-label");

const gameBoard = document.getElementById("game-board");
const winCounter = document.getElementById('wins');
const loseCounter = document.getElementById('losses');
// Create a 5x5 grid and starting position of 0,0


let width = 5; let height = 5;
let horiztonalPos = 0, verticalPos = 0;
let area = Field.generateArea(height, width, horiztonalPos, verticalPos, 0.3);
let gameArea = new Field(area, horiztonalPos, verticalPos);
let boardCreated = false;
let wins = 0;
let loses = 0;


let cells = [];





function createBoard() {

    const difficulty = holeSlider.value / 100;
    const size = sizeSlider.value;
    gameBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    area = Field.generateArea(size, size, horiztonalPos, verticalPos, difficulty);
    gameArea = new Field(area, horiztonalPos, verticalPos);

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
    gameBoard.innerHTML = "";
    cells.length = 0;


    //regenerating the field and restarting the running boolean
    const difficulty = holeSlider.value / 100;
    const size = sizeSlider.value;
    area = Field.generateArea(size, size, horiztonalPos, verticalPos, difficulty);
    gameArea = new Field(area, horiztonalPos, verticalPos);
    gameBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    running = true;

    //replace the current field and create a new one while updating css and such
    
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

                console.log(cell.classList.toString);
                gameBoard.appendChild(cell);
                cellRow.push(cell);
            }

            cells.push(cellRow);
            gameArea.cells = cells;

        }

    gameArea.print();



}


function initListeners() {

    // add text to counters


    document.getElementById("create_board").addEventListener("click", createBoard);


    // update difficulty slider

    holeSlider.addEventListener("input", () => {
        holePercentLabel.textContent = `${holeSlider.value}%`;
    });

    sizeSlider.addEventListener("input", () => {
        sizeLabel.textContent = `${sizeSlider.value}X${sizeSlider.value}`
        console.log(sizeSlider.value);
    });


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
                let walkedBack = false;
                if (!outOfBounds) {
                    walkedBack = area[gameArea.vertical][gameArea.horizontal] === Field.dirt;
                }

                if(outOfBounds) alertMsg += ` you were out of bounds`;
                else if(walkedBack) alertMsg += `You went back on your trace`
                else alertMsg += ` You fell on a hole`;

                alertMsg += `
                You were on horizontal: ${gameArea.horizontal} vertical: ${gameArea.vertical}`;


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


