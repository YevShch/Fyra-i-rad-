# Specifications Fyra-i-rad 

## Board
1. **Som användare vill jag kunna göra mitt drag så att det registreras korrekt på spelbrädet, dvs. välja en kolumn att lägga min bricka i.
2. **Som användare vill jag inte kunna göra förbjudna drag, dvs. inte kunna lägga till brickor i en full kolumn eller efter det att någon har vunnit, så att spelreglerna följs.

### Detailed specs
 * When board a created a property called matrix should be set to an empty board. ('initialize the matrix property as an empty board when a Board is created')
* An empty board should be a two-demensional array of 7x6 elements where each element should be a string containing a space ' '. ('check that the board has 6 rows and 7 columns')

* There should method named makeMove. The first argument should be color (a string value of either 'X' or 'O') and the second argument should be which column you want to place your piece on.
* Make move should return true for a valid move and place the piece on the board. For an invalid move (there is already a piece in the position, it is not the player with the specified colors turn or the game is over) the method should return false and not change the board.
* If a valid move is made the the whose turn it is should be updated. Up to the developer how to remember this state. (Sometimes implementation specifics are up to the programmer, since we will not run tests directly to see how the program remembers whose turn.)

### To test
1. Check that the matrix property is defined when a Board is created; 
2. Initialize the matrix property as an empty board when a Board is created;
3. Check that the board have 6 rows and 7 columns.

4. Verify that the makeMove method exists.
5. Check that the makeMove method takes color and column as its arguments.
6. Ensure that color can only be 'X' or 'O'.
7. Verify that the `makeMove` function returns `false` for an invalid column input:
   - Prevents a move when the column input is a negative value;
   - Prevents a move when the column input is a non-numeric values;
   - Prevents a move when the column input is a number outside the valid range ( 0 to 6 for a 7-column board). 

8. Check that `makeMove` returns true for a valid move and updates the board correctly.
9. Verify that `makeMove` returns false if the move is invalid:
 - prevents a move when the game is over;
 - prevents a move in a full column;
 - prevents a move when it's not the player's turn.
10. Confirm that the board remains unchanged after an invalid move.
11. Test that `makeMove` returns false and does not alter the board when the game is already over.

12. Check that after a valid move, the current player's turn is updated to the opposite player.
13. Validate that after an invalid move, the current player's turn does not change.
14. Confirm that the game properly alternates turns after each valid move.



## Player
3. **Som användare vill jag kunna ange mitt namn vid början av spelet så att datorn sedan kan använda sig av det för att meddela vems tur det är och vem som har vunnit.

### Detailed specs

### To test 


## App 
4. **Som användare vill jag att programmet meddelar om någon har vunnit så att vi vet detta.
5. **Som användare vill jag att programmet meddelar om det har blivit oavgjort så att vi vet detta. 
6. **Som användare vill jag efter avslutat spel få frågan om vi (jag och den andra användaren) vill spela igen. Om vi svarar ja vill jag att ett nytt spel ska starta (med ett tomt bräde) så att vi kan spela igen.  

### Detailed specs

### Tested 


### Not tested




## User stories

7. **Som systemägare vill jag att programmet skrivs objektorienterat så att kodbasen blir enklel att underhålla.

8. **Som systemägare vill jag att alla metoder i alla klasser testas med unit-tester, så att vi vet att logik och delmängder av programmet fungerar som de ska. (Kanske är detta en delmängd i varje user-story, “att testa”, snarare än en egen user story?)

### 
