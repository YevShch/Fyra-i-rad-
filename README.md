 # 🔴🟡 Connect Four Game 🎮 - Sprint 1

### EPIC for this sprint
Create the logic for a working Four in a row game (for two human players at the same computer) - no GUI.
Work according to TDD (Test Driven Development) - break down each user story into shared tasks - i.e. detailed specifications of which classes and methods should be created and how they should work. Write comprehensive unit tests before the corresponding program logic.
Work object-oriented in JavaScript and with Vitest/Jest as a testing tool.

### EPICS in upcoming sprints:
-  **[Sprint 2](https://github.com/YevShch/Fyra-i-rad-/tree/dev-GUI-Sprint-2):** Build a graphical user interface (GUI) for the game and ensure it is thoroughly tested.

-  **[Sprint 3](https://github.com/YevShch/Fyra-i-rad-/tree/dev-AI-Sprint3):** Create a rules-based AI and test it.

-  **[Sprint 4](https://github.com/YevShch/Fyra-i-rad-/tree/dev-Network-Sprint4):** Develop network functionality to allow players to compete over the internet, and test this feature.


**User stories**
1. As a user, I want to be able to enter my name at the start of the game so that the computer can then use it to announce whose turn it is and who has won.
2. As a user, I want to be able to make my move so that it registers correctly on the game board, ie. choose a column to put my tile in.
3. As a user, I don't want to be able to make forbidden moves, ie. not being able to add tiles to a full column or after someone has won, so that the rules of the game are followed.
4. As a user, I want the program to notify if someone has won so we know this.
5. As a user, I want the program to notify if it has been tied so we know this.
6. As a user, after finishing the game, I want to be asked if we (me and the other user) want to play again. If we answer yes, I want a new game to start (with an empty board) so we can play again.
7. As a system owner, I want the program to be written object-oriented so that the code base is easy to maintain.
8. As a system owner, I want all methods in all classes to be tested with unit tests, so we know that logic and subsets of the program are working as they should. (Perhaps this is a subset of each user story, "to test", rather than a separate user story?)

The **spesifications** can be found **[here](https://github.com/YevShch/Fyra-i-rad-/blob/dev-SPRINT1/specification.md)** 

The diagram of the game flow can be found  **[here](https://github.com/YevShch/Fyra-i-rad-/blob/dev-SPRINT1/gameFlowFunctions.md)** 

### Installation Guide
**Follow these steps to set up the game, run it, and perform unit testing using Vitest:**

1. **Initialize a new project and download repository files.** 

2. **Open the terminal:** Navigate to your project directory and open the terminal.

3. **Initialize npm:** Run the following command in the terminal to initialize npm and create a "package.json" file:
   ```bash
   npm init -y
   ```
4. **Add dependencies and configure project:**
After initializing npm, you need to update the package.json file to ensure the project uses ES modules. Add "type": "module" to the package.json file:

```json

{
  "name": "your-project-name",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "vitest"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "vitest": "^latest",
    "@vitest/ui": "^latest"
  }
}
```
5. **Run the game:**
To run the game in the terminal, use the following command:

```bash
node index
```
6. **Set up unit testing with Vitest:**
To enable unit testing, you need to install Vitest as a development dependency. Run the following command in the terminal:

```bash
npm install -D vitest
```
After installation, you can run your tests using the command:

```bash
npm test
```
7. **Set up Vitest UI for browser-based test results:**
If you prefer to view your test results in a browser interface, you can install Vitest UI. Use the following command to install it:

```bash
npm install @vitest/ui --save-dev
```
After installation, start the UI with:

```bash
npx vitest --ui
```
This will launch a browser window where you can view and interact with your test results.

