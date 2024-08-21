export default class Player {
  constructor(name, color) {
    if (typeof name !== 'string' || !/^[a-zA-Z]+$/.test(name) || name.length === 0) {
      throw new Error('Invalid name');
    }
    this.name = name;
    this.color = color;
  }

}