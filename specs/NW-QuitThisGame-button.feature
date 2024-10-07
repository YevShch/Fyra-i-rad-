Feature: Quit this game button

  Background: Game started
    Given that there are two players, and one creates a game while the other joins it
    When both players have made a few moves
    And player Red clicks on the "Quit this game" button

  Scenario: Player Red clicks the "Continue" button
    When player Red chooses "Continue" from the menu
    Then the game board should be displayed without any changes on both Player Red's and Player Yellow's screens

  Scenario: Player Red clicks the "Replay" button
    When player Red chooses "Replay" from the menu
    Then the game board should be rendered on both Player Red's and Player Yellow's screens
    And the turn message should display that it is Player Yellow's turn on both screens

  Scenario: Player Red clicks the "New game" button
    When player Red chooses "New game" from the menu
    Then Player Red should receive the message "Network Play: Do you want to play against a friend via the Internet?"
   



  
