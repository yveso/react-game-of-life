import React from "react";
import styled from "styled-components";

const GridDiv = styled.div`
  display: grid;
  grid-template-rows: repeat(${props => props.rows}, auto);
  grid-template-columns: repeat(${props => props.columns}, auto);
`;

function Board({ rows, columns }) {
  let list = [...Array(rows * columns).keys()];
  return (
    <>
      <h1>{`Rows: ${rows}, Columns: ${columns}`}</h1>
      <GridDiv rows={rows} columns={columns}>
        {list.map(x => (
          <div key={x}>{x}</div>
        ))}
      </GridDiv>
    </>
  );
}

export default Board;
