# Specifications Fyra-i-rad 

## Board
1. **Som användare vill jag kunna göra mitt drag så att det registreras korrekt på spelbrädet, dvs. välja en kolumn att lägga min bricka i.
2. **Som användare vill jag inte kunna göra förbjudna drag, dvs. inte kunna lägga till brickor i en full kolumn eller efter det att någon har vunnit, så att spelreglerna följs.

### Detailed specs Todo Code

#### Initialization:
 * When board a created a property called matrix should be set to an empty board. ('initialize the matrix property as an empty board when a Board is created')
* An empty board should be a two-demensional array of 7x6 elements where each element should be a string containing a space ' '. ('check that the board has 6 rows and 7 columns')
#### Rendering the Board:
The `render` method should:
* Print the current state of the board to the console in a formatted way, showing each cell separated by vertical bars and rows separated by horizontal lines.

#### Making a Move:
* There should method named `makeMove`. The first argument should be color (a string value of either 'X' or 'O') and the second argument should be which column you want to place your piece on.
* `makeMove` should return true for a valid move and place the piece on the board. For an invalid move (there is already a piece in the position, it is not the player with the specified colors turn or the game is over) the method should return false and not change the board.
* If a valid move is made the the whose turn it is should be updated. Up to the developer how to remember this state. 

#### Checking for a Win
* Create a method `winCneck`. The `winCheck` method should:
* - Check all possible winning combinations (horizontal, vertical, and diagonal) for four consecutive pieces of the same color.
* - Return the winning color ('X' or 'O') if a winning combination is found.
* - Return false if no winning combination is found.

#### Checking for a Draw:
* Skapa en function `drawCheck`. The `drawCheck` method should:
* - Return true if the board is full (no empty spaces) and there is no winner, indicating a draw.
* - Return false if the game is not a draw.
 
### To test
:x: 1. Check that the matrix property is defined when a Board is created; 
:x: 2. Initialize the matrix property as an empty board when a Board is created;
:x: 3. Check that the board have 6 rows and 7 columns.

:x:4. Verify that the makeMove method exists.
:x: 5. Check that the makeMove method takes color and column as its arguments.
:x: 6. Ensure that color can only be 'X' or 'O'.
:x: 7. Verify that the `makeMove` function returns `false` for an invalid column input:
   - Prevents a move when the column input is a negative value;
   - Prevents a move when the column input is a non-numeric values;
   - Prevents a move when the column input is a number outside the valid range ( 0 to 6 for a 7-column board).
   - Borderline case   (prevent a move when the column input is a number testa gränsfall (som den första och sista kolumnen))

:x: 8. Check that `makeMove` returns true for a valid move and updates the board correctly.
:x: 9. Verify that `makeMove` returns false if the move is invalid:
 - prevents a move when the game is over;
 - prevents a move in a full column;
 - prevents a move when it's not the player's turn.
:x: 10. Confirm that the board remains unchanged after an invalid move.
:x: 11. Test that `makeMove` returns false and does not alter the board when the game is already over.

:x: 12. Check that after a valid move, the current player's turn is updated to the opposite player.
:x: 13. Validate that after an invalid move, the current player's turn does not change.
:x: 14. Confirm that the game properly alternates turns after each valid move.

:x: 15. Check that winCheck return true if someone wins
     - check horisontal win;
     - check vertical win;
     - check diagonal wins;
:x: 16. Check that winCheck return false if no one wins 

:x: 17. Check that drawCheck return true if it is draw.
:x: 18. Check that drawCheck return false if someone wins. 
:x: 19. Check that drawCheck return false if game is not over.  



## Player
3. **Som användare vill jag kunna ange mitt namn vid början av spelet så att datorn sedan kan använda sig av det för att meddela vems tur det är och vem som har vunnit.

### Detailed specs
* There should be a class named Player.
* The constructor should take two arguments: name and color
* If you try to create a new Player and provide an empty string as name, then the constructor should throw an error.
* The Player constructor should throw an error if the name is not a string

### To test 
* 1. Check that the Player class has a two properties: name and color. 
* 2. Check that constructor throws an error when Player created with invalid name input:
- with symbols;
- with numbers;
- empty string;
- an object;


## App 
4. **Som användare vill jag att programmet meddelar om någon har vunnit så att vi vet detta.
5. **Som användare vill jag att programmet meddelar om det har blivit oavgjort så att vi vet detta. 
6. **Som användare vill jag efter avslutat spel få frågan om vi (jag och den andra användaren) vill spela igen. Om vi svarar ja vill jag att ett nytt spel ska starta (med ett tomt bräde) så att vi kan spela igen.  

### Detailed specs
#### Initialization:
* When an instance of App is created, it should:
* - Initialize players by calling `createPlayers`.
* - Create a new game board by instantiating the Board class.
* - Start the game loop by calling `startGameLoop`.
* - Check the winner and display the result by calling `whoHasWonOnGameOver`.
* - Prompt the user to play again and repeat the process if the user chooses to do so.
#### Player Creation:
* The `createPlayers` method should:
* - Clear the console.
* - Prompt the user for the names of players X and O.
* - Store the players' names and colors in this.playerX and this.playerO using the Player class.
#### Game Loop:
* The `startGameLoop` method should:
* Continuously prompt the current player for their move until the game is over.
* Ensure the move is valid by using `makeMove` from the Board class.
* Render the board after each valid move.
* If the move is invalid (e.g., the column is full or input is incorrect), prompt the player again without changing the turn.

#### Game Over Handling:
* The `whoHasWonOnGameOver` method should:
* Clear the console.
* Render the final state of the board.
* If there is a winner, announce the winning player.
* If there is no winner and the game is a draw, announce the draw.
#### Play Again Prompt:
* After a game finishes, the user should be asked if they want to play again. If the user answers "ja", a new game starts; otherwise, the program terminates.

### To test 
 * 1. Check that the App class initializes the game correctly:
* - Verify that `createPlayers` is called.
* - Verify that Board is instantiated.
* - Verify that `startGameLoop `is called.
* - Verify that `whoHasWonOnGameOver` is called.
* 2. Test that the `createPlayers` method correctly prompts for player names and assigns them to this.playerX and this.playerO.
* 3. Test that the `startGameLoop` method prompts the current player for a move and updates the board correctly:
 * - Ensure that valid moves update the board and the turn changes.
 * -Ensure that invalid moves do not change the board or the turn.
* 4. Test that `whoHasWonOnGameOver` correctly announces the winner or declares a draw:
* - Check for a correct win message when a player wins.
* - Check for a draw message when the game ends in a draw.
* 5. Test that the play again prompt works as expected:
* - Check that a new game starts if the user answers "ja".
* - Check that the program terminates if the user answers anything other than "ja".
* 6. Verify that the program loops correctly, allowing multiple games to be played in succession.
* 7. Ensure that the game correctly handles edge cases such as:
* - Rapid input or unexpected inputs during prompts.
* - Game continuation after reaching a win condition.
* - Game correctly restarts and resets all states.


## User stories

7. **Som systemägare vill jag att programmet skrivs objektorienterat så att kodbasen blir enklel att underhålla.

8. **Som systemägare vill jag att alla metoder i alla klasser testas med unit-tester, så att vi vet att logik och delmängder av programmet fungerar som de ska. (Kanske är detta en delmängd i varje user-story, “att testa”, snarare än en egen user story?)

### 
