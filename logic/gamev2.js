

const objects = {

    player: '*',
    hat: '^',
    hole: 'O',
    grass: '░',
    dirt: '|'

};



const createArea = (rows, cols, startRow, startCol, diff) => {


    //creating an empty array for the area
    const area = Array.from({ length: height }, () =>
        Array.from({ length: width }, () => Field.grass)
    );


    //initialize the player
    area[startRow][startCol] = objects.player;


    //make sure theres no null
    let hatCol = 0, hatRow = 0;

    // generating random position for the hat
    //make sure hat wont spawn on the player's location
    do {
        hatRow = Math.floor(Math.random() * height);
        hatCol = Math.floor(Math.random() * width);
    } while (area[hatRow][hatCol] === objects.player);

    //create num holes based on diff
    const numHoles = Math.ceil((height * width) * difficulty);


    // generate holes
    let holesPlaced = 0;
    while (holesPlaced < numHoles) {
        const r = Math.floor(Math.random() * height);
        const c = Math.floor(Math.random() * width);

        if (area[r][c] !== area.player && area[r][c] !== objects.hat) {
            area[r][c] = objects.hole;
            holesPlaced++;
        }
    }

    return area;
}


const outOfBounds = (rowPos, colPos, area) => {
    try {
        const checkCol = colPos < 0 || colPos > area[0].length;
        const checkRow = rowPos < 0 || rowPos > area.length;
        return checkRow || checkCol;
    } catch (e){
          console.log("area isnt initialized properly", e)
    }
};

const fellOnAHole = (rowPos,colPos,area) =>{
    return (area[rowPos][colPos] === objects.hole);
}