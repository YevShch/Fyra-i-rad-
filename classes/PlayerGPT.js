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
    const depth = 4; // Depth of the search
    const bestMove = this.minimax( depth, true );
    return [ bestMove.column ];
  }

  minimax ( depth, isMaximizingPlayer, alpha = -Infinity, beta = Infinity ) {
    const legalMoves = this.legalMoves;

    if ( depth === 0 || this.isGameOver() ) {
      return { score: this.evaluateBoard(), column: null };
    }

    let bestMove = { score: isMaximizingPlayer ? -Infinity : Infinity, column: null };

    for ( let column of legalMoves ) {
      const row = this.board.matrix.findIndex( r => r[ column ].color === ' ' );
      if ( row === -1 ) continue; // Skip if no valid row is found

      // Make the move
      this.board.matrix[ row ][ column ].color = isMaximizingPlayer ? this.color : this.opponent;

      const result = this.minimax( depth - 1, !isMaximizingPlayer, alpha, beta );
      this.board.matrix[ row ][ column ].color = ' '; // Undo the move

      if ( isMaximizingPlayer ) {
        if ( result.score > bestMove.score ) {
          bestMove.score = result.score;
          bestMove.column = column;
        }
        alpha = Math.max( alpha, bestMove.score );
      } else {
        if ( result.score < bestMove.score ) {
          bestMove.score = result.score;
          bestMove.column = column;
        }
        beta = Math.min( beta, bestMove.score );
      }

      if ( beta <= alpha ) {
        break; // Beta cut-off
      }
    }

    return bestMove;
  }

  evaluateBoard () {
    // Define your evaluation function for the board here
    let score = 0;
    // Example evaluation logic
    // Evaluate board state for winning opportunities, blocking opponent, etc.
    // This is where you should implement the logic for scoring the board
    return score;
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

  isGameOver () {
    // Implement the logic to check if the game is over
    // For example, check if there is a win or if the board is full
    return false;
  }
}
