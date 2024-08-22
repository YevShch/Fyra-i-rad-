export default class Board {
  constructor () {
    this.matrix = [ ...new Array( 6 ) ].map( () =>
      [ ...new Array( 7 ) ].map( () => ' ' )
    );
    this.currentPlayerColor = 'X';
    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;
  }

  render () {
    let line = '\n' + '-'.repeat( 29 ) + '\n';
    console.log(
      line +
      this.matrix.map( row =>
        row.map( column => `| ${ column } ` ).join( '' )
        + '|' ).join( line ) +
      line
    );
  }
  

  drawCheck () {
    // Check if there is no winner and all cells are filled
    return !this.winner && !this.matrix.flat().includes( ' ' );
  }
}
