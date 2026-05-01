// Store game board and related functions
const gameBoard = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  function getBoard() {
    console.table(board);
  }

  function makeMove(y, x, player) {
    if (board[y][x] === "") {
      board[y][x] = player;
      console.clear();
      getBoard();
    } else {
      console.log("Not a valid move");
      alert("Not a valid move");
    }
  }

  return { getBoard, makeMove };
})();

// Store players and related functions
const players = (() => {
  let playerOne = { name: "", id: "X" };
  let playerTwo = { name: "", id: "O" };

  function getPlayerOne() {
    return playerOne;
  }

  function getPlayerTwo() {
    return playerTwo;
  }

  function createPlayerOne(playerName) {
    playerOne.name = playerName;
  }

  function createPlayerTwo(playerName) {
    playerTwo.name = playerName;
  }

  return { createPlayerOne, createPlayerTwo, getPlayerOne, getPlayerTwo };
})();

// Main function that initializes game and controls game flow
const game = (() => {
  function displayBoard() {
    gameBoard.getBoard();
  }

  function startGame() {
    displayBoard();

    const playerName = prompt("What's your name?");

    players.createPlayerOne(playerName);
    alert(`Hello ${playerName}!`);

    // for loop to prevent infinite loop while no winning condition is implemented
    for (let i = 0; i < 4; i++) {
      choseMove();
    }
  }

  function choseMove() {
    const play = prompt(
      "Make a move (write two numbers next to each other such as '01' or '12', the first is the line number and the second the column number",
    );
    gameBoard.makeMove(play[0], play[1], "X");

    // write here the logic that evaluates if there's a winner
    // then if game continues...
  }

  return { displayBoard, startGame };
})();

game.startGame();
