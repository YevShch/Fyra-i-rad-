import shuffleArray from "./helpers/arrayShuffle.js";
import sleep from './helpers/sleep.js';

export default class Player {
  constructor ( name, type, color, board ) {
    this.name = name;
    this.type = type;
    this.color = color;
    this.opponent = this.color === 'red' ? 'yellow' : 'red'; // Determine opponent color
    this.board = board;
  }

  async makeBotMove () {
    console.log( 'makeBotMove has been called' )
    await sleep( 500 ); // Delay for bot's "thinking" to simulate human-like behavior
    let column;
    if ( this.type === 'A dumb bot' ) {
      [ column ] = this.makeDumbBotMove(); // Get a random column for a dumb bot
    } else if ( this.type === 'A smart bot' ) {
      [ column ] = this.makeSmartBotMove(); // Get the best column for a smart bot
    }
    await this.board.makeMove( this.color, column ); // Make the chosen move
  }

  makeDumbBotMove () {
    // Randomly select a legal move
    return [ shuffleArray( this.legalMoves )[ 0 ] ];
  }


  makeSmartBotMove () {
    let orgState = this.state(); // Get the current state of the board
    let scores = [];

    // Loop through each legal move
    for ( let column of this.legalMoves ) {
      // Find the lowest empty row in this column
      let row = this.board.matrix.findIndex( r => r[ column ].color === ' ' );
      if ( row === -1 ) continue; // Skip if no valid row is found

      // Temporarily make the move
      this.board.matrix[ row ][ column ].color = this.color;
      let futureState = this.state(); // Get the state of the board after the move
      this.board.matrix[ row ][ column ].color = ' '; // Undo the temporary move

      // Score this move based on the future state
      scores.push( { column, score: this.score( orgState, futureState ) } );
    }

    // Sort scores in descending order and select the best move
    scores = shuffleArray( scores ).sort( ( a, b ) => b.score - a.score );
    let { column } = scores[ 0 ];
    return [ column ];
  }

  score ( orgState, futureState ) {
    // Define priorities for scoring moves
    let priorities = [
      { me: 3 }, { opp: 2 }, { opp: 1 }, { me: 2 }, { me: 1 }
    ];
    let score = 0;

    // Evaluate each winning combination
    for ( let i = 0; i < orgState.length; i++ ) {
      let b = orgState[ i ], a = futureState[ i ];
      if ( b.me === a.me && b.opp === a.opp ) continue; // No change, skip
      if ( b.me > 0 && b.opp > 0 ) continue; // Both players have pieces, skip

      let partScore = '';
      // Evaluate how good the move is for a single winCombo
      for ( let j = 0; j < priorities.length; j++ ) {
        let key = Object.keys( priorities[ j ] )[ 0 ];
        let value = priorities[ j ][ key ];
        partScore += ( a[ key ] === value ) ? '01' : '00';
      }
      score += +partScore;
    }

    // (the scoreing works well in Tic-Tac-Toe
    // but in Connect 4 it misses that what it considers the best move (highest score)
    // will sometimes give the opponent an opportunity to win by playing the same column
    // (ie. directly "above") the chosen move
    // you can avoid this by trying to play an opponent move in the same column
    // and if that gives a win set score to negative - 1)

    return score; // Return the total score for the move
  }


  get legalMoves () {
    let moves = [];
    // Iterate over each column to check for possible moves
    for ( let column = 0; column < this.board.matrix[ 0 ].length; column++ ) {
      // Check from the bottom-most row upwards
      for ( let row = this.board.matrix.length - 1; row >= 0; row-- ) {
        if ( this.board.matrix[ row ][ column ].color === ' ' ) {
          moves.push( column ); // Add column to list of legal moves
          break; // Exit loop as we found an available slot
        }
      }
    }
    console.log( 'Legal moves:', moves );
    return moves; // Return the list of legal columns
  }

  state () {
    let state = [];
    // Evaluate each winning combination to determine the board state
    for ( let winCombo of this.board.winChecker.winCombos ) {
      state.push( {
        me: winCombo.numberOfCells( this.color ),
        opp: winCombo.numberOfCells( this.opponent )
      } );
    }
    return state; // Return the state of the board
  }
}
