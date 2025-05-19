
class Field {

    static player = '*';
    static hat = '^';
    static hole = 'O';
    static grass = '░';
    static dirt = '|';

    constructor(area, horizontal, vertical){
        this._area = area;
        this._cells = [];
        this._horizontal = horizontal;
        this._vertical = vertical;
    }


    // DOM visual reference setter
    get cells() {
        return this._cells;
    }

    get area() {
        return this._area;
    }

    get vertical() {
        return this._vertical;
    }

    get horizontal() {
        return this._horizontal;
    }

    set vertical(position) {
        this._vertical = position;
    }

    set cells(grid) {
        this._cells = grid;
    }

    set horizontal(position) {
        this._horizontal = position;
    }

    outOfBounds() {
        return (
            this._vertical < 0 ||
            this._horizontal < 0 ||
            this._vertical > this._area.length ||
            this._horizontal > this._area[0].length
        );
    }

    lost() {
        if (this.outOfBounds()) {
            console.log("You are out of bounds. You lost.");
            return true;
        }

        if (this._area[this._vertical][this._horizontal] === Field.hole) {
            console.log("You fell in a hole. You lost.");
            return true;
        }

        return false;
    }

    won() {
        if (this._area[this._vertical][this._horizontal] === Field.hat) {
            console.log("You won!");
            return true;
        }

        return false;
    }

    move(e) {

        // get the prev position
        let prevPos = {
            h: this._horizontal,
            v: this._vertical
        };

        switch (e.key.toLowerCase()) {
            case 'w':
                this._vertical -= 1;
                break;
            case 's':
                this._vertical += 1;
                break;
            case 'a':
                this._horizontal -= 1;
                break;
            case 'd':
                this._horizontal += 1;
                break;
            default:
                break; // do nothing if it's not a movement key
        }


        if (!this.lost() && !this.won()) {
            this._area[prevPos.v][prevPos.h] = Field.dirt;
            this._area[this._vertical][this._horizontal] = Field.player;
            prevPos.v = this._vertical; // update prev player Positions
            prevPos.h = this._horizontal;
            this.updateBoardVisuals();
            this.print(); // optional debug
        }
    }

    updateBoardVisuals() {
        for (let row = 0; row < this._area.length; row++) {
            for (let col = 0; col < this._area[row].length; col++) {
                const cell = this._cells[row][col];
                cell.classList.add('cell') // Reset base class

                switch (this._area[row][col]) {
                    case Field.hat:
                        cell.classList.add('hat');
                        break;
                    case Field.hole:
                        cell.classList.add('hole');
                        break;
                    case Field.player:
                        cell.classList.add('player');
                        break;
                    case Field.grass:
                        cell.classList.add('grass');
                        break;
                    case Field.dirt:
                        cell.classList.add('dirt');
                    default:
                        cell.classList.remove('player');
                        break;
                }
            }
        }
    }

    print() {
        for (const row of this._area) {
            console.log(row.join(' '));
        }
    }

    static generateArea(height, width, horiztonalPos = 0, verticalPos = 0) {
        const field = Array.from({ length: height }, () =>
            Array.from({ length: width }, () => Field.grass)
        );

        // adding the player position based on the Field creation
        field[horiztonalPos][verticalPos] = Field.player;

        const hatRow = Math.floor(Math.random() * height);
        const hatCol = Math.floor(Math.random() * width);

        //make sure hat wont spawn on the player's locatiob
        while(field[hatRow][hatCol] === Field.player){
            hatRow =  Math.floor(Math.random() * height);
            hatCol = Math.floor(Math.random() * width);
        }
        field[hatRow][hatCol] = Field.hat;

        
    
        const minHoles = 2;
        const maxHoles = Math.ceil((height * width) * 0.3);
        const numHoles = Math.floor(Math.random() * (maxHoles - minHoles + 1)) + minHoles;

        let holesPlaced = 0;
        while (holesPlaced < numHoles) {
            const r = Math.floor(Math.random() * height);
            const c = Math.floor(Math.random() * width);

            if (field[r][c] !== Field.player  && field[r][c] !== Field.hat) {
                field[r][c] = Field.hole;
                holesPlaced++;
            }
        }

        return field;
    }
}

export { Field };
