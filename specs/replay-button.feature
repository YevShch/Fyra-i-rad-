Feature: Replay Button Behavior

  Background: Start the game by entering player names
    Given the game is loaded
    And the player enters "Eva" as the red player
    And the player enters "Alex" as the yellow player
    And the game is in progress
    And the red player wins the game

  Scenario: Display the winner's name and verify the Replay button functionality
    Then the system should declare "Eva" as the winner
    And the "Replay" button should be visible
    When the player clicks the "Replay" button
    Then a dialog should show "Alex's turn" to start the new game
    And the player should click "OK" to start the new game
    And the game board should be reset




