import WinCombo from "./WinCombo.js";

export default class WinChecker {

  constructor(board) {
    this.board = board;
    this.matrix = board.matrix;
    // 69 different winCombos for Connect-4
    this.winCombos = [];
    this.calculateWinCombos();
  }

  // Calculate all the win combos for Connect-4
  calculateWinCombos() {
    // m - a short alias for this.matrix
    let m = this.matrix;
    // Represent ways you can win as offset from ONE position on the board
    // For Connect-4, we need to check for horizontal, vertical and two diagonal directions
    let offsets = [
      [[0, 0], [0, 1], [0, 2], [0, 3]],  // horizontal win
      [[0, 0], [1, 0], [2, 0], [3, 0]],  // vertical win
      [[0, 0], [1, 1], [2, 2], [3, 3]],  // diagonal 1 (from top-left to bottom-right)
      [[0, 0], [1, -1], [2, -2], [3, -3]] // diagonal 2 (from top-right to bottom-left)
    ];

    // Loop through the board to find all winCombos

    // r = row, c = column
    for (let r = 0; r < m.length; r++) {
      for (let c = 0; c < m[0].length; c++) {
        // ro = row offset, co = column offset
        for (let winType of offsets) {
          let combo = [];
          for (let [ro, co] of winType) {
            if (r + ro < 0 || r + ro >= m.length) { continue; }
            if (c + co < 0 || c + co >= m[0].length) { continue; }
            combo.push(m[r + ro][c + co]);
          }
          if (combo.length === 4) {
            this.winCombos.push(new WinCombo(combo));
          }
        }
      }
    }
  }

  // Check if there is a winning combo on the board
  winCheck() {
    for (let winCombo of this.winCombos) {
      if (winCombo.isWin('red')) { this.board.winningCombo = winCombo; return 'red'; }
      if (winCombo.isWin('yellow')) { this.board.winningCombo = winCombo; return 'yellow'; }
    }
    return false;
  }
}
