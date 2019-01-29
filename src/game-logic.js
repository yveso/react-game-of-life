function newBoard(rows, columns, lifeRate) {
  let board = new Array(rows);
  for (let r = 0; r < rows; r++) {
    board[r] = new Array(columns);
    for (let c = 0; c < columns; c++) {
      board[r][c] = Math.random() <= lifeRate;
    }
  }
  return board;
}

function nextBoard(currentBoard) {
  return currentBoard.map((row, rowIndex) => {
    return row.map((col, colIndex) =>
      hasLifeInNextRound(col, countNeighbours(currentBoard, rowIndex, colIndex))
    );
  });
}

function countNeighbours(board, row, col) {
  let neighbourCells = [].concat(
    row > 0
      ? [board[row - 1][col - 1], board[row - 1][col], board[row - 1][col + 1]]
      : [],
    [board[row][col - 1], board[row][col + 1]],
    row < board.length - 1
      ? [board[row + 1][col - 1], board[row + 1][col], board[row + 1][col + 1]]
      : []
  );
  return neighbourCells.filter(x => x).length;
}

function hasLifeInNextRound(isAlive, countNeighbours) {
  return isAlive
    ? countNeighbours === 2 || countNeighbours === 3
    : countNeighbours === 3;
}

function hasChangesInNextGeneration(current, next) {
  const currentFlat = current.flat();
  const nextFlat = next.flat();
  if (currentFlat.every(x => x === false)) {
    return false;
  }
  for (let i = 0; i < currentFlat.length; i++) {
    if (currentFlat[i] !== nextFlat[i]) {
      return true;
    }
  }
  return false;
}

export default {
  newBoard,
  nextBoard,
  hasChangesInNextGeneration
};
