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

    // check rows and columns
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === id) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
          return true;
        }
      }
      if (board[0][i] === id) {
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
          return true;
        }
      }
    }

    // check diagonals
    if (board[0][0] === id) {
      if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return true;
      }
    }

    if (board[0][2] === id) {
      if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return true;
      }
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

  function playGame() {
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

  return { displayBoard, playGame };
})();

game.playGame();

// TODO
//
// implement logic to detect that no more plays are possible and it's a tie and with that and win condition the game loop can run normally and will always stop if either a player wins or there's no more plays possible
