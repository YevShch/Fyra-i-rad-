# As a user, I want to be able to enter my name at the start of the game
#  so that the computer can then use it
#  to announce whose turn it is and who has won.

Feature: Connect Four game initialization and player turns

  Scenario: Verify the game starts with a request for player names
    Given the game has started
    When the programm starts
    Then the system should ask for the name of Player 1
    And the system should display the message "Enter the name of player"

  Scenario: Players enter their names and the game starts with the first player's turn
    Given the game has started
    When the system asks for the name of Player 1
    And I enter "Anna" as the name of Player 1
    Then the system asks for the name of Player 2
    And I enter "Erik" as the name of Player 2
    Then the game should display "Anna's turn" with a red circle indicating it is Player 1's turn

  Scenario Outline: The system re-asks for valid player names
    Given the game has started
    When the system asks for the name of Player 1
    And I enter "<invalidName>" as the name of Player 1
    Then the system should re-ask for the name of Player 1
    When I enter "<validName>" as the name of Player 1
    Then the system should accept the name and ask for the name of Player 2

    Examples:
      | invalidName | validName |
      | A           | Anna      |
      | 123         | Erik      |
      | @!$         | John      |
      | B1          | Mike      |
