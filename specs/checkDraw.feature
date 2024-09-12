Feature: Check for a draw game 

  Scenario: Test for a draw
    Given Player 1 enters their name as "Jonas"
    And Player 2 enters their name as "Anna"
    When the game begins
    And Player 1 and Player 2 play until the round ends in a draw
    Then the system should display a message indicating the game is a draw

  Scenario: Boundary Test - Win on the last available cell
    Given Player 1 enters their name as "Jonas"
    And Player 2 enters their name as "Anna"
    When the game begins
    And Player 1 and Player 2 play until the last move results in a win
    Then the system should declare Player 1 as the winner with name "Jonas"