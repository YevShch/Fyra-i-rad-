import prompt from '../helpers/prompt.js';
import Player from './Player.js';

export default class App {

    constructor() {
        this.playerX = null;
        this.playerO = null;
    }

    createPlayers() {
        this.playerX = new Player(prompt("Enter name for Player X:"));
        this.playerO = new Player(prompt("Enter name for Player O:"));
    }
}
