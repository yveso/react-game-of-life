import React, { useState } from "react";
import styled from "styled-components";
import GameLogic from "./game-logic";
import Settings from "./settings";

const GridDiv = styled.div`
  display: grid;
  grid-template-rows: repeat(${props => props.rows}, 50px);
  grid-template-columns: repeat(${props => props.columns}, 50px);
  grid-row-gap: 5px;
  grid-column-gap: 5px;
`;

const Cell = styled.div`
  background: ${props => (props.isAlive ? "black" : "gray")};
  color: white;
`;

function Board() {
  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState(10);
  const [ratio, setRatio] = useState(0.5);
  const [board, setBoard] = useState(GameLogic.newBoard(rows, columns));
  const [nextBoard, setNextBoard] = useState(GameLogic.nextBoard(board));
  const [isSettingsMode, setIsSettingsMode] = useState(true);

  function changeBoard(newBoard) {
    setBoard(newBoard);
    setNextBoard(GameLogic.nextBoard(newBoard));
  }

  function generateBoardClick() {
    changeBoard(GameLogic.newBoard(rows, columns, ratio));
    setIsSettingsMode(false);
  }

  function nextBoardClick() {
    changeBoard(GameLogic.nextBoard(board));
  }

  function toggleCell(row, column) {
    let b = board.slice();
    b[row][column] = !b[row][column];
    changeBoard(b);
  }

  return (
    <>
      {isSettingsMode ? (
        <Settings
          settings={{
            rows,
            setRows,
            columns,
            setColumns,
            ratio,
            setRatio,
            generateBoardClick
          }}
        />
      ) : (
        <>
          <button onClick={() => setIsSettingsMode(true)}>New Board</button>
          <button onClick={nextBoardClick}>Next</button>
          <GridDiv rows={rows} columns={columns}>
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <Cell
                  isAlive={cell}
                  key={`${rowIndex}_${colIndex}`}
                  onClick={() => toggleCell(rowIndex, colIndex)}
                >
                  {nextBoard[rowIndex][colIndex] ? "😂" : cell ? "🤢" : ""}
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
