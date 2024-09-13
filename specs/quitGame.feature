Feature: Quit game functionality

  Scenario: Display quit dialog and resume the game with no changes
    Given the game is in progress
    Then I write the players name
    When I click the 'Quit this game' button
    Then a dialog box appears with the question 'What do you want to do?'
    And three buttons: 'Continue', 'Replay', 'New Game' are displayed
    When I select the 'Continue' button
    Then I return to the game
    And the game data is unchanged