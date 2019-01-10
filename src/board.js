import React, { useState } from "react";
import styled from "styled-components";

const GridDiv = styled.div`
  display: grid;
  grid-template-rows: repeat(${props => props.rows}, 50px);
  grid-template-columns: repeat(${props => props.columns}, 50px);
  grid-row-gap: 5px;
  grid-column-gap: 5px;
`;

function randomBoard(rows, columns) {
  let board = new Array(rows);
  for (let r = 0; r < rows; r++) {
    board[r] = new Array(columns);
    for (let c = 0; c < columns; c++) {
      board[r][c] = Math.random() < 0.3;
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

const Cell = styled.div`
  background: ${props => (props.isAlive ? "black" : "gray")};
  color: white;
`;

function Board({ rows, columns }) {
  const [board, setBoard] = useState(randomBoard(rows, columns));
  function clicky() {
    setBoard(nextBoard(board));
  }
  return (
    <>
      <h1>{`Rows: ${rows}, Columns: ${columns}`}</h1>
      <GridDiv rows={rows} columns={columns}>
        {board.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <Cell isAlive={col} key={`${rowIndex}_${colIndex}`}>
              {" "}
              {hasLifeInNextRound(
                col,
                countNeighbours(board, rowIndex, colIndex)
              )
                ? "😀"
                : ""}{" "}
            </Cell>
          ))
        )}
      </GridDiv>
      <button onClick={clicky}>Next</button>
    </>
  );
}

export default Board;
