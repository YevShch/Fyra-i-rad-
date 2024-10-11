## # 🔴🟡 Connect Four Game 🎮 - Sprint 2
### EPIC for this Sprint
Create a graphical interface (GUI) for your Four in a row game.

### User Stories
1. As a product owner, I want the team based on the other user stories and how you want to design your graphical interface to create an interface sketch to be used in the continued work in the sprint and approved by the product owner.

2. As a user, after finishing the game, I want to be asked if we (me and the other user) want to play again. If we answer yes, I want a new game to start (with an empty board) so we can play again. **Then previous names should be remembered if users want it, but users should also be given the option to change names if they so wish.**

3. As a system owner, I want the GUI to be tested with Cypress + Cucumber in the way you have learned in previous courses, alternatively (feel free to try) with Vitest/Jest with browser DOM mocking extensions.

4. As a system owner, I want the GUI to be manually reviewed/tuned/tested against **[Jacob Nielsen's 10 guidelines](https://www.nngroup.com/articles/ten-usability-heuristics/)** so we know it's ok for the user.

### EPICS in Previous Sprints:

**[Sprint 1](https://github.com/YevShch/Fyra-i-rad-/tree/dev-SPRINT1):** Develop the core game logic (for two human players) without a graphical interface, ensuring it follows test-driven development (TDD) principles with object-oriented JavaScript and Vitest/Jest for testing.


### EPICS in upcoming sprints:

**[Sprint 3](https://github.com/YevShch/Fyra-i-rad-/tree/dev-AI-Sprint3):** Create a rules-based AI and test it.

**[Sprint 4](https://github.com/YevShch/Fyra-i-rad-/tree/dev-Network-Sprint4):** Develop network functionality to allow players to compete over the internet, and test this feature.


Our sketch of the graphical version of the game can be found **[here](https://www.figma.com/design/3Gf6Ttu2ecaPr4N3fagJ73/Figma-basics?node-id=1669-162202&node-type=canvas)** 

### Testing the GUI Version with Cypress 
To ensure the graphical interface functions as intended, we utilized Cypress for end-to-end testing. Cypress provides a robust framework for testing user interactions and verifying the overall functionality of the application. Our tests focused on user flows, such as starting a new game, player interactions, and confirming that the game state updates correctly after each move.

By using Cypress, we were able to simulate real user behavior and ensure that the GUI meets the expected usability standards outlined in our user stories.

Our tests utilizing Cypress can be found **[here](https://github.com/YevShch/Fyra-i-rad-/tree/dev-GUI-Sprint-2/specs).**

### How to Run the Tests
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



### Testing the GUI Version with Vitest
To test the GUI version using Vitest, we implemented HTML mocking using the Happy DOM library. This allowed us to simulate the DOM environment for our tests, ensuring that we could effectively validate our GUI interactions and components.

Our tests utilizing Vitest can be found **[here](https://github.com/YevShch/Fyra-i-rad-/tree/dev-GUI-Sprint-2/tests).**

#### Installation and Running Tests with Vitest
1. Install Vitest and Happy DOM: If you do not have Vitest installed, you can install it by running:

```bash
npm install vitest --save-dev
```

2. Additionally, install the Happy DOM library to mock the HTML:

```bash
npm install happy-dom --save-
```
3. Running Tests: To run your Vitest tests, you can use the following command in your terminal:

```bash
npm run test`
```
4. If you want to run a specific test file, you can do so by specifying the file name:

```bash
npm run tests/your-test-file-name
```

#### Testing the GUI Version with Vitest and Cucumber

1. Install Vitest-Cucumber: For running Gherkin scenarios with Vitest, you can install the Vitest-Cucumber library:

```bash
npm install @amiceli/vitest-cucumber --save-dev
```
2. Generate spec file from feature file
If you want to save time, vitest-cucumber can generate a spec file.

You can use it like this :
```bash
npx @amiceli/vitest-cucumber <path-to-feature> <path-to-spec>
```

An example :
```bash
npx @amiceli/vitest-cucumber tests/board.feature tests/board.spec.ts
```
