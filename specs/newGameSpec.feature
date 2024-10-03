Feature: New Game Feature

  As a player I want to be able to reset the game state
  So that I can start a fresh game when I click the "New Game" button

  Scenario: Resetting the game state when the "New Game" button is clicked
    Given I am on the game page
    And the game is in progress
    When I click on the "New game" button
    Then the game should reset and ask for new player names

  Scenario: Displaying the "New Game" option when the game is over
    Given I am on the game page
    And the game is over
    When I click on the "Quit this game" button
    Then the "New game" button should be visible
