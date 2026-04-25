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

const players = (() => {
  let playerOne = {};
  let playerTwo = {};

  function getPlayerOne() {
    return playerOne;
  }

  function getPlayerTwo() {
    return playerTwo;
  }

  function createPlayer() {
    const name = prompt("Player 1, what's your name?");
    return name;
  }

  return { createPlayer, getPlayerOne, getPlayerTwo };
})();

const game = (() => {
  function displayBoard() {
    gameBoard.getBoard();
  }

  return { displayBoard };
})();

game.displayBoard();
