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

* Skapa en function winCneck. Den ska returnera true när någon har vunnit, och returnera false när det inte finns något vinstkombination. Den ska innehålla vinst kombination (horisontel, vertikal och två diagonala). 

* Skapa en function drawCheck. Den ska returnera true när spelet är avgjord, när alla celler är fulla och inte matchar något vinstkombination. 



### To test
:white_check_mark: 1. Check that the matrix property is defined when a Board is created; 
:white_check_mark: 2. Initialize the matrix property as an empty board when a Board is created;
:white_check_mark: 3. Check that the board have 6 rows and 7 columns.

:white_check_mark: 4. Verify that the makeMove method exists.
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

:x: 15. Check that winCheck return true if someone go on proper way:
     - check horisontal win;
     - check vertical win;
     - check diagonal wins;
:x: 16. Check that winCheck return false if someone do not go on proper way 

:x: 17. Check that drawCheck return true if it is draw. 




## Player
3. **Som användare vill jag kunna ange mitt namn vid början av spelet så att datorn sedan kan använda sig av det för att meddela vems tur det är och vem som har vunnit.

### Detailed specs
* There should be a class named Player.
* The constructor should take two arguments: name and color
* If you try to create a new Player and provide an empty string as name, then the constructor should throw an error.
* The Player constructor should throw an error if the name is not a string

### To test 
* check that the Player class has a two properties: name and color. 
* check that constructor throws an error when Player created with invalid name input:
- with symbols;
- with numbers;
- empty string;
- an object;




## App 
4. **Som användare vill jag att programmet meddelar om någon har vunnit så att vi vet detta.
5. **Som användare vill jag att programmet meddelar om det har blivit oavgjort så att vi vet detta. 
6. **Som användare vill jag efter avslutat spel få frågan om vi (jag och den andra användaren) vill spela igen. Om vi svarar ja vill jag att ett nytt spel ska starta (med ett tomt bräde) så att vi kan spela igen.  

### Detailed specs
* Skapa en klass App. 
Det ska vara möjligt att ange namn för spelare 1 och spelare 2. 
Programmet ska sätta color på spelare automatisk vid skapandet: spelare 1 ska vara 'X' och spelare 2 ska vara 'O'.
App ska fråga en spelare om i vilken kolumn den ska göra ett drag. 
App ska hantera felaktiga drag - returnera false och fråga den spelaren att göra en annan försök. 
App ska hantera vinst - meddella att någon har vunnit och avsluta spelet (att man kan inte göra ett drag).
App ska hantera draw - meddela att det är avgjord och avsluta spelet (att man kan inte göra ett drag).
App ska fråga spelare om de vill börja ett nytt spel med svar ja/nej. Om man svarar NEJ då ska programmet(App) avslutas. Om man svarar JA då ska ett nytt spel startas och brädet ska vara tom (matrix ska innehålla bara ' '). 

###To test 
* Kontrolera att programmet startas i terminalen
* Kontrolera att programmet frågar spelarens : 

### Tested 


### Not tested




## User stories

7. **Som systemägare vill jag att programmet skrivs objektorienterat så att kodbasen blir enklel att underhålla.

8. **Som systemägare vill jag att alla metoder i alla klasser testas med unit-tester, så att vi vet att logik och delmängder av programmet fungerar som de ska. (Kanske är detta en delmängd i varje user-story, “att testa”, snarare än en egen user story?)

### 
