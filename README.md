## School assignment: Four in a row - sprint 1

### EPIC's for this sprint
Create the logic for a working Four in a row game (for two human players at the same computer) - no GUI.
Work according to TDD (Test Driven Development) - break down each user story into shared tasks - i.e. detailed specifications of which classes and methods should be created and how they should work. Write comprehensive unit tests before the corresponding program logic.
Work object-oriented in JavaScript and with Vitest/Jest as a testing tool.

### EPICS in upcoming sprints:
1. **Sprint 2:** Create a graphical user interface and test it.
2. **Sprint 3:** Create a rules-based AI and test it.
3. **Sprint 4:** Add ability to play over network and test this functionality.

**User stories**
1. As a user, I want to be able to enter my name at the start of the game so that the computer can then use it to announce whose turn it is and who has won.
2. As a user, I want to be able to make my move so that it registers correctly on the game board, ie. choose a column to put my tile in.
3. As a user, I don't want to be able to make forbidden moves, ie. not being able to add tiles to a full column or after someone has won, so that the rules of the game are followed.
4. As a user, I want the program to notify if someone has won so we know this.
5. As a user, I want the program to notify if it has been tied so we know this.
6. As a user, after finishing the game, I want to be asked if we (me and the other user) want to play again. If we answer yes, I want a new game to start (with an empty board) so we can play again.
7. As a system owner, I want the program to be written object-oriented so that the code base is easy to maintain.
8. As a system owner, I want all methods in all classes to be tested with unit tests, so we know that logic and subsets of the program are working as they should. (Perhaps this is a subset of each user story, "to test", rather than a separate user story?)
