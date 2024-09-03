//yevheniia's version with drop and hover preview, and animation for the winning combination 
// to test this board start test-board.html with Live Server 
export default class Board {
  constructor ( app ) {
    this.app = app;
    this.matrix = [ ...new Array( 6 ) ].map( () =>
      [ ...new Array( 7 ) ].map( () => ' ' ) );
    this.currentPlayerColor = 'red';  // Color of the current player
    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;
    this.winningCombo = [];
  }

  render () {
    // Create the click handler for the column
    globalThis.makeMoveOnClick = ( column ) => {
      if ( this.makeMove( this.currentPlayerColor, column ) ) {
        this.app.render();
      }
    };

    // Create the hover handlers
    globalThis.showPreview = ( column ) => {
      // Find the lowest empty cell in the column
      const cells = document.querySelectorAll( `.cell[data-column="${ column }"]` );
      for ( let i = cells.length - 1; i >= 0; i-- ) {
        const cell = cells[ i ];
        if ( cell.classList.contains( 'empty' ) ) {
          cell.classList.add( 'preview' );
          cell.style.backgroundColor = this.currentPlayerColor === 'red' ? 'rgba(255,0,0,0.5)' : 'rgba(255,255,0,0.5)';
          break;
        }
      }
    };

    globalThis.hidePreview = ( column ) => {
      document.querySelectorAll( `.cell[data-column="${ column }"]` ).forEach( cell => {
        cell.classList.remove( 'preview' );
        cell.style.backgroundColor = '';
      } );
    };

    // Set game statuses in the body for styling purposes
    document.body.setAttribute( 'currentPlayerColor',
      this.gameOver ? '' : this.currentPlayerColor );
    document.body.setAttribute( 'gameInProgress',
      this.app.namesEntered && !this.gameOver );

    // Render the game board as HTML
    return /*html*/`<div class="board">
      ${ this.matrix.map( ( row, rowIndex ) =>
      row.map( ( cell, columnIndex ) => /*html*/`
          <div
            class="cell ${ cell === 'red' ? 'red' : ( cell === 'yellow' ? 'yellow' : 'empty' ) } 
                  ${ this.winningCombo.some( ( [ r, c ] ) => r === rowIndex && c === columnIndex ) ? 'winning-cell' : '' }"
            data-column="${ columnIndex }"
            onmouseover="showPreview(${ columnIndex })"
            onmouseout="hidePreview(${ columnIndex })"
            onclick="makeMoveOnClick(${ columnIndex })">
            <div class="circle"></div>
          </div>
        `).join( '' ) ).join( '' ) }
    </div>`;
  }

  makeMove ( color, column ) {
    //check that the game is not over
    if ( this.gameOver ) { return false; }

    // check that the color is red or yellow - otherwise don't make the move
    if ( color !== 'red' && color !== 'yellow' ) { return false; }

    // check that the color matches the player's turn - otherwise don't make the move
    if ( color !== this.currentPlayerColor ) { return false; }

    // check that column is not full
    if ( this.matrix[ 0 ][ column ] !== ' ' ) { return false; }

    //make move
    for ( let r = this.matrix.length - 1; r >= 0; r-- ) {
      if ( this.matrix[ r ][ column ] === ' ' ) {
        this.matrix[ r ][ column ] = this.currentPlayerColor;

        // Check the win immediately after the move
        if ( this.winCheck( r, column ) ) {
          this.gameOver = true;
        } else if ( this.drawCheck() ) {  // Check the draw if game is not over 
          this.isADraw = true;
          this.gameOver = true;
        }
        // Change the prlayer
        this.currentPlayerColor = this.currentPlayerColor === 'red' ? 'yellow' : 'red';
        return true;
      }
    }
    return false;
  }

  winCheck ( row, col ) {
    const playerColor = this.matrix[ row ][ col ];
    if ( !playerColor ) return false;

    const directions = [
      [ 0, 1 ],   // horizontal (right)
      [ 1, 0 ],   // vertical (down)
      [ 1, 1 ],   // diagonal (down-right)
      [ 1, -1 ],  // diagonal (down-left)
    ];

    for ( const [ rowStep, colStep ] of directions ) {
      let count = [ [ row, col ] ];
      count = count.concat( this.countInDirection( row, col, rowStep, colStep, playerColor ) );
      count = count.concat( this.countInDirection( row, col, -rowStep, -colStep, playerColor ) );

      if ( count.length >= 4 ) {
        this.winner = playerColor;
        this.gameOver = true;
        this.winningCombo = count;
        return true;
      }
    }
    return false;
  }

  countInDirection ( row, col, rowStep, colStep, playerColor ) {
    let count = [];
    for ( let i = 1; i < 4; i++ ) {
      const newRow = row + i * rowStep;
      const newCol = col + i * colStep;

      // Check boundaries
      if ( newRow < 0 || newRow >= this.matrix.length || newCol < 0 || newCol >= this.matrix[ 0 ].length ) {
        break;
      }
      if ( this.matrix[ newRow ][ newCol ] === playerColor ) {
        count.push( [ newRow, newCol ] );
      } else {
        break;
      }
    }
    return count;
  }

  drawCheck () {
    // Check if there is no winner and all cells are filled
    return !this.winner && !this.matrix.flat().includes( ' ' );
  }
}
