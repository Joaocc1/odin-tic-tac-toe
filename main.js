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

  function makeMove(x, y, player) {
    if (board[x][y] === "") {
      board[x][y] = player;
      console.clear();
      getBoard();
    } else {
      console.log("Not a valid move");
      alert("Not a valid move");
    }
  }

  function checkWin(player) {
    let id = "";

    if (player === "Player One") {
      id = "X";
    } else {
      id = "O";
    }

    let isWinning = 0;
    // let counter = 0;

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === id) {
          isWinning++;
          if (isWinning === 3) {
            return true;
          }
        } else {
          if (isWinning > 0) {
            isWinning--;
          }
        }
      }
      // counter++;
      // console.log(`Rounds: ${counter}`);
    }

    return false;
  }

  return { getBoard, makeMove, checkWin };
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
      const isWin = gameBoard.checkWin("Player One");

      if (isWin === true) {
        console.log("You win");
      }
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

// TODO
//
// continue logic for winning condition
// right now it evaluates the top row, maybe create an inner for loop to evaluate all rows
