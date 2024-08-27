export default class Board {
  constructor() {
    this.matrix = [...new Array(6)].map(() =>
      [...new Array(7)].map(() => ' ')
    );
    this.currentPlayerColor = 'X';
    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;
  }

  render() {
    let line = '\n' + '-'.repeat(29) + '\n';
    console.log(
      line +
      this.matrix.map(row =>
        row.map(column => `| ${column} `).join('')
        + '|').join(line) +
      line
    );
  }

  makeMove(color, column) {
    // console.log( "Before move:" );
    // console.log( "Current player:", this.currentPlayerColor );
    // console.log( "Game over:", this.gameOver );

    if (this.gameOver) { return false; }

    // check that the color is X or O - otherwise don't make the move
    if (color !== 'X' && color !== 'O') { return false; }

    // check that the color matches the player's turn - otherwise don't make the move
    if (color !== this.currentPlayerColor) { return false; }

    //check that input is valid (between 1 and 7 and is a number)
    if (isNaN(column) || column < 0 || column >= this.matrix[0].length) {
      console.log("Ogiltigt drag. Försök igen.");
      return false;
    }

    // check that column is not full
    if (this.matrix[0][column] !== ' ') {
      console.log("Kolumnen är full. Försök igen.");
      return false;
    }
    // if ( this.matrix.every( row => row[ column ] !== ' ' ) ) {
    //   return false; // Column is full
    // }

    //make move 
    for (let r = this.matrix.length - 1; r >= 0; r--) {
      if (this.matrix[r][column] === ' ') {
        this.matrix[r][column] = this.currentPlayerColor;
        // console.log( `Placed ${ this.currentPlayerColor } in column ${ column }, row ${ r }` );
        this.currentPlayerColor = this.currentPlayerColor === 'X' ? 'O' : 'X';
      
        return true;
      }
    }
    return false;
  }

  winCheck(row, col) {
    const playerColor = this.matrix[row][col];
    if (!playerColor) return false;

    const directions = [
      [0, 1],   // horizontal (right)
      [1, 0],   // vertical (down)
      [1, 1],   // diagonal (down-right)
      [1, -1],  // diagonal (down-left)
    ];

    for (const [rowStep, colStep] of directions) {
      let count = 1;

      // Count in the positive direction
      count += this.countInDirection(row, col, rowStep, colStep, playerColor);

      // Count in the negative direction
      count += this.countInDirection(row, col, -rowStep, -colStep, playerColor);

      // If 4 or more in a row are found, we have a winner
      if (count >= 4) {
        this.winner = playerColor;
        this.gameOver = true;
        return true;
      }
    }

    // If no win is detected
    return false;
  }

  countInDirection(row, col, rowStep, colStep, playerColor) {
    let count = 0;

    for (let i = 1; i < 4; i++) {
        const newRow = row + i * rowStep;
        const newCol = col + i * colStep;

        // Check boundaries
        if (newRow < 0 || newRow >= this.matrix.length || newCol < 0 || newCol >= this.matrix[0].length) {
            break;
        }

        // Check if the cell matches the player's color
        if (this.matrix[newRow][newCol] === playerColor) {
            count++;
        } else {
            break;
        }
    }

    return count;
  }
  

}

