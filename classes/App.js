import prompt from '../helpers/prompt.js';
import Board from './Board.js';
import Player from './Player.js'; 

export default class App {

    constructor () {
        this.playerX = null;
        this.playerO = null;
        this.board = null;
    }

    createPlayers () {
        console.clear();  // Console'u temizle

        console.log('FOUR-IN-A-ROW\n');  // Oyun başlığını yaz

        // Oyuncu isimlerini al
        const playerXName = prompt('Spelare X:s namn: ');
        const playerOName = prompt('Spelare O:s namn: ');

        // Oyuncu nesnelerini oluştur
        this.playerX = new Player(playerXName, 'X');
        this.playerO = new Player(playerOName, 'O');
    }

    startGameLoop () {
        // Bu metodu implement edin
    }

    whoHasWonOnGameOver () {
        // Bu metodu implement edin
    }

    startGame () {
        while (true) {
            this.createPlayers(); // Oyuncuları oluştur
            this.board = new Board(); // Yeni bir oyun tahtası oluştur
            this.startGameLoop(); // Oyun döngüsünü başlat
            this.whoHasWonOnGameOver(); // Kazananı belirle veya berabere durumu

            // Tekrar oynamak isteyip istemediğini sor
            console.log('');
            let playAgain = prompt('Vill ni spela igen? (ja/nej)? ');
            if (playAgain !== 'ja') {
                break; // Tekrar oynamak istemiyorsa döngüyü kır
            }
        }
    }
}
