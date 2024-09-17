export default class Cell {

  constructor ( row, column ) {
    this.row = row;
    this.column = column;
    // will be filled by X or O eventually
    this.color = ' ';
  }

  toString () {
    return this.color;
  }

}
