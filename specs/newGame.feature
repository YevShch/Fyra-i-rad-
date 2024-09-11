Feature: Reset game and verify new player names

  Scenario: Reset game after player wins and start new game with different players
    Then I am on the game page
    Given Enter the first players name "Emily"
    And Enter the second players name "Alice"
    When the game starts
    Then Player 1 wins the game
    And I should see the "New game" button
    When I click the "New game" button
    And  Enter the first players name "George"
    And Enter the second players name "Helen"
    Then the game should start with player "George" as "red"
    And a new board is displayed
    And it should be "George"'s turn with the red circle shown
   
