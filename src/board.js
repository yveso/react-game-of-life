import React, { useState } from "react";
import styled from "styled-components";
import Settings from "./settings";

const GridDiv = styled.div`
  display: grid;
  grid-template-rows: repeat(${props => props.rows}, 50px);
  grid-template-columns: repeat(${props => props.columns}, 50px);
  grid-row-gap: 5px;
  grid-column-gap: 5px;
`;

function randomBoard(rows, columns, lifeRate) {
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

const Cell = styled.div`
  background: ${props => (props.isAlive ? "black" : "gray")};
  color: white;
`;

function Board() {
  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState(10);
  const [board, setBoard] = useState(randomBoard(rows, columns));
  const [isBuildingMode, setBuildingMode] = useState(true);

  function generateBoardClick(ratio) {
    setBoard(randomBoard(rows, columns, ratio));
    setBuildingMode(false);
  }

  function nextBoardClick() {
    setBoard(nextBoard(board));
  }

  function toggleCell(row, column) {
    let b = board.slice();
    b[row][column] = !b[row][column];
    setBoard(b);
  }

  return (
    <>
      {isBuildingMode ? (
        <Settings
          rows={rows}
          setRows={setRows}
          columns={columns}
          setColumns={setColumns}
          generateBoardClick={generateBoardClick}
        />
      ) : (
        <>
          <button onClick={() => setBuildingMode(true)}>Back</button>
          <button onClick={nextBoardClick}>Next</button>
          <GridDiv rows={rows} columns={columns}>
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <Cell
                  isAlive={cell}
                  key={`${rowIndex}_${colIndex}`}
                  onClick={() => toggleCell(rowIndex, colIndex)}
                >
                  {" "}
                  {hasLifeInNextRound(
                    cell,
                    countNeighbours(board, rowIndex, colIndex)
                  )
                    ? "😀"
                    : cell
                    ? "🤢"
                    : ""}{" "}
                </Cell>
              ))
            )}
          </GridDiv>
        </>
      )}
    </>
  );
}

export default Board;
