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

  function checkCondition(player) {
    let id = "";
    let isBoardFull = 0;

    if (player === "player one") {
      id = "X";
    } else {
      id = "O";
    }

    // check rows and columns
    for (let i = 0; i < 3; i++) {
      if (board[i][0] !== "") {
        isBoardFull += 1;
      }

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

    console.log(isBoardFull);

    if (isBoardFull === 9) {
      return "tie";
    } else {
      return false;
    }
  }

  return { getBoard, makeMove, checkCondition };
})();

// Store players and related functions
const players = (() => {
  let playerOne = { name: "", id: "X" };
  let playerTwo = { name: "", id: "O" };

  function getPlayer(player) {
    if (player === "player one") {
      return playerOne;
    } else if (player === "player two") {
      return playerTwo;
    }
  }

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

  return {
    createPlayerOne,
    createPlayerTwo,
    getPlayerOne,
    getPlayerTwo,
    getPlayer,
  };
})();

// Main function that initializes game and controls game flow
const game = (() => {
  function displayBoard() {
    gameBoard.getBoard();
  }

  function playGame() {
    let currentPlayer = "player one";
    displayBoard();

    // player one prompt
    const playerOneName = prompt("Player 1, what's your name?");

    // player two prompt
    const playerTwoName = prompt("Player 2, what's your name?");

    players.createPlayerOne(playerOneName);
    players.createPlayerTwo(playerTwoName);
    alert(`Hello ${playerOneName} and ${playerTwoName}!`);

    // for loop to prevent infinite loop while no winning condition is implemented
    for (let i = 0; i < 11; i++) {
      // make a move
      choseMove(currentPlayer);

      // check if game ends
      const isGameOver = gameBoard.checkCondition(currentPlayer);

      if (isGameOver === "tie") {
        console.log("It's a tie");
      } else if (isGameOver === true) {
        console.log("You win");
      }

      // change player's turn
      if (currentPlayer === "player one") {
        currentPlayer = "player two";
      } else if (currentPlayer === "player two") {
        currentPlayer = "player one";
      }
    }
  }

  function choseMove(player) {
    let playerId = players.getPlayer(player).id;
    console.log(playerId);

    const play = prompt(
      "Make a move (write two numbers next to each other such as '01' or '12', the first is the line number and the second the column number",
    );
    gameBoard.makeMove(play[0], play[1], playerId);

    // write here the logic that evaluates if there's a winner
    // then if game continues...
  }

  return { displayBoard, playGame };
})();

game.playGame();

// TODO
//
// introduce player two; it creates now figure were it's best to control the turn flow, if in the choseMove() function or outside of it
