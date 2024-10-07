Feature: Network Play - Replay Feature

Scenario: Players can choose to play again after the game is over
Given Redplayer starts the game Yellowplayer joins the game
When both players play the game until one wins
And the winner should be visible on both screens
When the "Replay" button can be clicked on the Red Player's screen

