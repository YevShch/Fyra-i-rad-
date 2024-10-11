Feature: board initialization

  Scenario: Display the correct logo or headline text
    Given the game has started
    When the page is loaded
    Then the headline should display "Connect four"

  Scenario: The board contains 42 cells
    Given the game has started
    When the game board is displayed
    Then the board should contains 42 cells

  Scenario: Players make the first two moves, and the moves are displayed on the board
    Given the game has started and the players are registered
    When Player 1 drops a disc into the first column
    Then the first column should display a disc from Player 1
    When Player 2 drops a disc into the second column
    Then the second column should display a disc from Player 2
