import WinCombo from "./WinCombo.js";

export default class WinChecker {

  constructor ( board ) {
    this.board = board;
    this.matrix = board.matrix;
    this.winCombos = [];
    this.calculateWinCombos();
  }


  // calculate all the win combos once and remember them
  // this programming pattern is called memoization
  // (and helps save processing power / speeds up the program)
  calculateWinCombos () {
    // m - a short alias for this.matrix
    let m = this.matrix;
    // represent ways you can win as offset from ONE position on the board
    let offsets = [
      [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ] ],  // horizontal win
      [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ] ],  // vertical win
      [ [ 0, 0 ], [ 1, 1 ], [ 2, 2 ], [ 3, 3 ] ],  // diagonal win (from bottom left to top right)
      [ [ 0, 0 ], [ 1, -1 ], [ 2, -2 ], [ 3, -3 ] ] // diagonal win (from top left to bottom right)
    ];
    // loop through the board to find all winCombos

    // r = row, c = column
    for ( let r = 0; r < m.length; r++ ) {
      for ( let c = 0; c < m[ 0 ].length; c++ ) {
  
        for ( let winType of offsets ) {
          let combo = [];
          for ( let [ ro, co ] of winType ) {
            if ( r + ro < 0 || r + ro >= m.length ) { continue; }
            if ( c + co < 0 || c + co >= m[ 0 ].length ) { continue; }
            combo.push( m[ r + ro ][ c + co ] );
          }
          if ( combo.length === 4 ) {
            // console.log( 'Combo:', combo );  // Output of the combination
            this.winCombos.push( new WinCombo( combo ) ); // save coordinate combinations
            
          }
        }
      }
    }
  }

  winCheck () {
    for ( let winCombo of this.winCombos ) {
      if ( winCombo.isWin( 'red' ) ) { this.board.winningCombo = winCombo; return 'red'; }
      if ( winCombo.isWin( 'yellow' ) ) { this.board.winningCombo = winCombo; return 'yellow'; }
    }
    return false;
  }

}
