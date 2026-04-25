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

gameBoard.getBoard();
