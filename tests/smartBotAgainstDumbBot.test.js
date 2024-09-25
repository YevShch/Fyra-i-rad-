import Player from './Player.js';
import Board from './Board.js'; // Assuming you have a Board class that handles the game logic
import sleep from './helpers/sleep.js';

class Game {
  constructor() {
    this.board = new Board(); // Yeni bir oyun tahtası oluştur
    this.smartBot = new Player('Smart Bot', 'A smart bot', 'red', this.board); // Smart Bot tanımlandı
    this.dumbBot = new Player('Dumb Bot', 'A dumb bot', 'yellow', this.board); // Dumb Bot tanımlandı
  }

  async playMatch() {
    this.board.reset(); // Her maçın başında oyun tahtasını sıfırlayın

    let currentPlayer = this.smartBot; // İlk hamleyi Smart Bot yapsın
    let gameOver = false;

    while (!gameOver) {
      await currentPlayer.makeBotMove(); // Sıradaki oyuncunun hamlesini yap
      gameOver = this.board.isGameOver(); // Oyun bitmiş mi kontrol et
      currentPlayer = currentPlayer === this.smartBot ? this.dumbBot : this.smartBot; // Sıra diğer oyuncuya geçsin
      await sleep(500); // Oyunun hızını ayarlamak için bir gecikme ekleyin (daha insana yakın simülasyon)
    }

    return this.board.getWinner(); // Kazananı geri döndürün ('red' Smart Bot, 'yellow' Dumb Bot)
  }
}

async function testBots() {
  let smartBotWins = 0;
  const numberOfMatches = 5;  // 5 maç oynanacak

  console.log(`Test başlatılıyor: Smart Bot vs Dumb Bot - ${numberOfMatches} maç.`);

  for (let i = 0; i < numberOfMatches; i++) {
    console.log(`\n=== Maç ${i + 1} ===`);
    const game = new Game();
    const winner = await game.playMatch();

    if (winner === 'red') {
      smartBotWins++;
      console.log(`Smart Bot ${i + 1}. maçı kazandı.`);
    } else if (winner === 'yellow') {
      console.log(`Beklenmeyen sonuç: Dumb Bot ${i + 1}. maçı kazandı. Test başarısız!`);
      return; // Eğer Dumb Bot kazanırsa, testi erken sonlandır
    } else {
      console.log(`Maç ${i + 1} berabere bitti. Test başarısız!`);
      return; // Eğer beraberlik olursa testi erken sonlandır
    }

    // Bir sonraki maça geçmeden önce 1 saniye bekle
    await sleep(1000);
  }

  console.log(`\nTest Sonuçları:`);
  console.log(`Smart Bot, ${numberOfMatches} maçın tamamını kazandı.`);

  // Smart Bot'un tüm oyunları kazanıp kazanmadığını kontrol edin
  if (smartBotWins === numberOfMatches) {
    console.log('Smart Bot tüm maçları kazandı. Test başarılı.');
  } else {
    console.log('Smart Bot tüm maçları kazanmadı. Test başarısız.');
  }
}

// Testi başlat
testBots();
