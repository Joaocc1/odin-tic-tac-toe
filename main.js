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
      console.clear();
      getBoard();
      return true;
    } else {
      console.log("Not a valid move");
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

  function resetBoard() {
    board.forEach((row) => {
      for (let i = 0; i < row.length; i++) {
        row[i] = "";
      }
    });
  }

  return { getBoard, makeMove, checkCondition, resetBoard };
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

  function resetPlayers() {
    playerOne.name = "";
    playerTwo.name = "";
  }

  return {
    createPlayerOne,
    createPlayerTwo,
    getPlayerOne,
    getPlayerTwo,
    getPlayer,
    resetPlayers,
  };
})();

// Main function that initializes game and controls game flow
const GameController = (() => {
  let currentPlayer = "player one";

  function displayBoard() {
    GameBoard.getBoard();
  }

  function attemptMove(playerMove) {
    let playerId = Players.getPlayer(getCurrentPlayer()).id;
    const attemptMove = GameBoard.makeMove(
      playerMove[0],
      playerMove[1],
      playerId,
    );

    console.log(playerId);
    console.log(playerMove);

    // only if attempt move is successful checks for a win and changes current player
    if (attemptMove) {
      // check if game ends
      const isGameOver = GameBoard.checkCondition(currentPlayer);

      if (isGameOver === "tie" || isGameOver === true) {
        return isGameOver;
      } else if (isGameOver === false) {
        // change player's turn
        if (currentPlayer === "player one") {
          currentPlayer = "player two";
          return isGameOver;
        } else if (currentPlayer === "player two") {
          currentPlayer = "player one";
          return isGameOver;
        }
      }
    } else if (!attemptMove) {
      return "not a valid move";
    }
  }

  function getCurrentPlayer() {
    return currentPlayer;
  }

  function changeCurrentPlayer(player) {
    currentPlayer = player;
  }

  function newGame() {}

  function resetGame() {
    GameBoard.resetBoard();
    currentPlayer = "player one";
  }

  return {
    displayBoard,
    getCurrentPlayer,
    changeCurrentPlayer,
    attemptMove,
    newGame,
    resetGame,
  };
})();

const RenderUI = (() => {
  const msgOutput = document.querySelector(".msg-output");
  const board = document.querySelector(".board");
  const squares = document.querySelectorAll(".square");
  const getGameBoard = GameBoard.getBoard(); // array of 3 arrays with 3 inside
  const newGameBtn = document.querySelector(".new-game-btn");
  const resetGameBtn = document.querySelector(".reset-btn");
  const dialog = document.querySelector("dialog");
  const cancelDialogBtn = document.querySelector(".cancel-btn");
  const submitDialogBtn = document.querySelector(".submit-btn");

  console.log(getGameBoard);

  function updateMsgOutput(message) {
    msgOutput.textContent = message;
  }

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

    const result = GameController.attemptMove(playerMove);
    let outputMsg = "";

    switch (result) {
      case "not a valid move":
        outputMsg = `Not a valid move! It's ${Players.getPlayer(GameController.getCurrentPlayer()).name}'s turn`;
        break;
      case "tie":
        outputMsg = "It's a tie!";
        board.removeEventListener("click", handleBoard);
        break;
      case true:
        outputMsg = `${Players.getPlayer(GameController.getCurrentPlayer()).name} wins!`;
        board.removeEventListener("click", handleBoard);
        break;
      case false:
        outputMsg = `It's ${Players.getPlayer(GameController.getCurrentPlayer()).name}'s turn`;
        break;

      default:
        break;
    }

    updateMsgOutput(outputMsg);
    renderBoard();
  }

  newGameBtn.addEventListener("click", () => {
    dialog.showModal();
    renderBoard();
    board.addEventListener("click", handleBoard);
  });
  resetGameBtn.addEventListener("click", () => {
    if (Players.getPlayerOne().name !== "") {
      GameController.resetGame();
      updateMsgOutput(
        `It's ${Players.getPlayer(GameController.getCurrentPlayer()).name}'s turn`,
      );
      // remove event listener and add it again to account for both cases where this event listener will be active or has been removed
      board.removeEventListener("click", handleBoard);
      board.addEventListener("click", handleBoard);
      renderBoard();
    }
  });

  submitDialogBtn.addEventListener("click", (e) => {
    const playerOneName = document.querySelector(".player-one").value;
    const playerTwoName = document.querySelector(".player-two").value;

    GameController.resetGame();
    Players.resetPlayers();
    renderBoard();

    Players.createPlayerOne(playerOneName);
    Players.createPlayerTwo(playerTwoName);

    updateMsgOutput(
      `It's ${Players.getPlayer(GameController.getCurrentPlayer()).name}'s turn`,
    );

    e.preventDefault();
    dialog.close();
  });

  cancelDialogBtn.addEventListener("click", () => {
    dialog.close();
  });

  return { renderBoard, updateMsgOutput };
})();

// TODO
//
// clean up the ui and make it look better
