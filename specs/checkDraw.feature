Feature: Check for a draw game

  Scenario: Test for a draw
    Given the game starts with Player 1 named "Jonas" and Player 2 named "Anna"
    When the game begins
    And the players play until the game ends in a draw
    Then the system should display a message indicating the game is a draw

  Scenario: Boundary Test - Win on the last available cell
    Given the game starts with Player 1 named "Jonas" and Player 2 named "Anna"
    When the game begins
    And the players play until the last move results in a win
    Then the system should declare Player1 as the winner with name "Jonas"
