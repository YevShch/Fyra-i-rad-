Feature: Replay Button Behavior

  Scenario: Verify the Replay button functionality
    Given the game is loaded 
    And the player enters "Eva" as the red player
    And the player enters "Alex" as the yellow player
    And the red player wins the game
    And the system should declare "Eva" as the winner
    And the "Replay" button should be visible
    When the player clicks the "Replay" button
    Then a dialog should show "IT'S ALEX'S TURN TO START!"
    And the player should click "OK" to start the new game
    And the game board should be reset




