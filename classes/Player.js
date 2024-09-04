//the original version from sprint 1
export default class Player {
  constructor(name, color) {
    if (typeof name !== 'string' || !/^[a-zA-Z]+$/.test(name) || name.length === 0) {
      throw new Error('Ogiltigt namn!');
    }
    this.name = name;
    this.color = color;
  }

}
