export default class Cell {

  constructor(row, column) {
    this.row = row;
    this.column = column;
    // will be filled by 'Red' or 'Yellow' eventually
    this.color = ' ';  // Initially, the cell is empty
  }

  toString() {
    return this.color;
  }

}
