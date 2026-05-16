// Store game board and related functions
const GameBoard = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  function getBoard() {
    console.table(board);
    return board;
  }

  function makeMove(x, y, player) {
    if (board[x][y] === "") {
      board[x][y] = player;
      // console.clear();
      getBoard();
      return true;
    } else {
      console.log("Not a valid move");
      alert("Not a valid move");
      return false;
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
      if (board[i][0] !== "" && board[i][1] !== "" && board[i][2] !== "") {
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

    if (isBoardFull === 3) {
      return "tie";
    } else {
      return false;
    }
  }

  return { getBoard, makeMove, checkCondition };
})();

// Store players and related functions
const Players = (() => {
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
const GameController = (() => {
  let currentPlayer = "player one";

  function displayBoard() {
    GameBoard.getBoard();
  }

  function choseMove(play) {
    console.log(play);
    let player = getCurrentPlayer();
    let playerId = Players.getPlayer(player).id;
    console.log(playerId);

    const move = GameBoard.makeMove(play[0], play[1], playerId);

    return move;
  }

  function attemptMove(playerMove) {
    let validMove = false;
    let gameOver = false;

    while (!validMove) {
      // make a move
      const attemptMove = choseMove(playerMove);

      if (attemptMove) {
        validMove = true;

        // check if game ends
        const isGameOver = GameBoard.checkCondition(currentPlayer);

        if (isGameOver === "tie") {
          console.log("It's a tie");
          gameOver = true;
        } else if (isGameOver === true) {
          console.log("You win");
          gameOver = true;
        }

        // change player's turn
        if (currentPlayer === "player one") {
          currentPlayer = "player two";
        } else if (currentPlayer === "player two") {
          currentPlayer = "player one";
        }
      }
    }
  }

  function getCurrentPlayer() {
    return currentPlayer;
  }

  function changeCurrentPlayer(player) {
    currentPlayer = player;
  }

  return {
    displayBoard,
    getCurrentPlayer,
    changeCurrentPlayer,
    choseMove,
    attemptMove,
  };
})();

const RenderUI = (() => {
  const board = document.querySelector(".board");
  const rows = document.querySelectorAll(".row");
  const squares = document.querySelectorAll(".square");
  const getGameBoard = GameBoard.getBoard(); // array of 3 arrays with 3 inside

  console.log(getGameBoard);

  function renderBoard() {
    let numSquare = 0;

    getGameBoard.forEach((row) => {
      for (let i = 0; i < row.length; i++) {
        squares[numSquare].textContent = row[i];
        numSquare++;
      }
    });
  }

  function handleBoard(e) {
    console.log(e.target.className);

    const squareClicked = e.target.className;
    let playerMove = "";

    switch (squareClicked) {
      case "square one":
        playerMove = "00";
        break;
      case "square two":
        playerMove = "01";
        break;
      case "square three":
        playerMove = "02";
        break;
      case "square four":
        playerMove = "10";
        break;
      case "square five":
        playerMove = "11";
        break;
      case "square six":
        playerMove = "12";
        break;
      case "square seven":
        playerMove = "20";
        break;
      case "square eight":
        playerMove = "21";
        break;
      case "square nine":
        playerMove = "22";
        break;
      default:
        playerMove = "";
        break;
    }

    GameController.attemptMove(playerMove);

    renderBoard();
  }

  // ------- Begin game --------------

  renderBoard();

  // player one prompt
  const playerOneName = prompt("Player 1, what's your name?");

  // player two prompt
  const playerTwoName = prompt("Player 2, what's your name?");

  Players.createPlayerOne(playerOneName);
  Players.createPlayerTwo(playerTwoName);
  alert(`Hello ${playerOneName} and ${playerTwoName}!`);

  board.addEventListener("click", handleBoard);

  return { renderBoard };
})();

// TODO
//
// refactor players function to be a regular function factory because it will be reused as a factory that will produce multiple objects
