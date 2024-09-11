Feature: Start a new game of Connect Four

  Scenario: Start a new game and enter player names
    Given I am on the game page
    When I click the "New game" button
    Then I should be prompted to enter the name of player "red"
    And I enter "Alice" as the red player name
    And I enter "Bob" as the yellow player name
    Then the game should start with player "Alice" as "red" and a new board is displayed
    And it should be "Alice's" turn with the red circle shown

