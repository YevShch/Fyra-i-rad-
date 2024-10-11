Feature: Quit game functionality
As a user, 
I want to be able to continue the game after clicking the Quit button and 
then the Continue button once the game has started.

  Scenario: Display quit dialog and resume the game with no changes
    Then I am on the game page for Quitting
    Given Enter the first players name "Emily"
    And Enter the second players name "Alice"
    When the game starts
    When I click to 'Quit this game' button
    Then a dialog box appears with the question 'What do you want to do?'
    And three buttons: 'Continue', 'Replay', 'New game' are displayed
    When I click to the 'Continue' button
    Then I return to the game page
    And the game page is unchanged
