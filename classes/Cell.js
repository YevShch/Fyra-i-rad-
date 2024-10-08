export default class Cell {

  constructor ( row, column ) {
    this.row = row;
    this.column = column;
    // will be filled by red or yellow eventually
    this.color = ' ';
  }

  toString () {
    return this.color;
  }

}
