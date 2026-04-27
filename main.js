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
      getBoard();
    } else {
      console.log("Not a valid move");
    }
  }

  return { getBoard, makeMove };
})();

// Store players and related functions
const players = (() => {
  let playerOne = { name: "" };
  let playerTwo = { name: "" };

  function getPlayerOne() {
    return playerOne;
  }

  function getPlayerTwo() {
    return playerTwo;
  }

  function createPlayerOne(name) {
    playerOne.name = name;
  }

  function createPlayerTwo(name) {
    playerTwo.name = name;
  }

  return { createPlayerOne, createPlayerTwo, getPlayerOne, getPlayerTwo };
})();

// Main function that initializes game and controls game flow
const game = (() => {
  function displayBoard() {
    gameBoard.getBoard();
  }

  return { displayBoard };
})();

game.displayBoard();
