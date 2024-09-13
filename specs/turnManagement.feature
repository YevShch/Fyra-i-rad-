Feature: Turn management in Connect Four

  Scenario: Display correct player turn at the start
    Given the game starts with Player 1 named "Jonas" and Player 2 named "Anna"
    When the game begins
    Then the system should display that it is Player 1's turn with the red piece

  Scenario: Alternate player turns after each move
    Given the game starts with Player 1 named "Jonas" and Player 2 named "Anna"
    When Player 1 makes a move
    Then the system should display that it is Player 2's turn with the yellow piece
    When Player 2 makes a move
    Then the system should display that it is Player 1's turn with the red piece