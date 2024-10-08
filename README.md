#### School Assignment: Four in a Row - Sprint 4
### EPIC for this Sprint
Develop network functionality to allow players to compete over the internet, and test this feature.

### User Stories
1. As a user I want to be able to play against another user via network/internet so we can meet in game even if we can't meet IRL/in real life.

2. As a system owner, I want automated tests to be performed to ensure that network games are working properly.

## EPICS in Previous Sprints:

**[Sprint 1](https://github.com/YevShch/Fyra-i-rad-/tree/dev-SPRINT1):** Develop the core game logic (for two human players) without a graphical interface, ensuring it follows test-driven development (TDD) principles with object-oriented JavaScript and Vitest/Jest for testing.

**[Sprint 2](https://github.com/YevShch/Fyra-i-rad-/tree/dev-GUI-Sprint-2):** Build a graphical user interface (GUI) for the game and ensure it is thoroughly tested.


**[Sprint 3](https://github.com/YevShch/Fyra-i-rad-/tree/dev-AI-Sprint3):** Create a rules-based AI and test it.

### Testing the Network Version with Cypress
In this sprint, we focused on thoroughly testing the network functionality using Cypress. 
Our tests were designed to simulate the entire flow, where two players can select the option to play against each other via the internet. One player creates a game, receives a unique join code, and the other player uses that code to join the game. The main focus of these tests was to verify that the game mirrors the actions of both players correctly and consistently on both ends. This includes ensuring that the gameplay reflects synchronously for both players, regardless of their location.

To test the network game on two screens simultaneously, we used **iframes** within Cypress. This allowed us to simulate two separate player sessions within the same browser instance, ensuring that both players could interact with the game from their respective perspectives. By embedding the game into iframes, we could efficiently test the network play experience for both users in a synchronized and automated manner.

You can find our detailed Cypress test cases **[here](https://github.com/YevShch/Fyra-i-rad-/tree/dev-Network-Sprint4/specs).**

## How to Run the Tests
To run the Cypress tests on your local machine, follow these steps:

1. Install Cypress (if not installed): If you do not have Cypress installed, you can install it by running:

```bash
npm install cypress --save-dev
```
2. Start the Game: Open your terminal and start the game server by running:

```bash
npm start
```
3. Open Cypress Tests: In a separate terminal window, run the following command to open the Cypress test runner:

```bash
npm run test-cypress-ui
```

Once Cypress is open, select the test you want to run from the UI and observe the automated testing process for the network functionality.

By running these tests, you can confirm that the network gameplay works as expected, ensuring a smooth experience for both players.
