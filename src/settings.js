import React, { useState } from "react";

function Settings({ rows, setRows, columns, setColumns, generateBoardClick }) {
  const [ratio, setRatio] = useState(0.5);
  return (
    <>
      <label htmlFor="rowsSlider">{`Rows: ${rows}`}</label>
      <input
        type="range"
        name="rowsSlider"
        min="5"
        max="50"
        defaultValue={rows}
        onChange={e => setRows(e.target.value)}
      />
      <br />
      <label htmlFor="columnsSlider">{`Columns: ${columns}`}</label>
      <input
        type="range"
        name="columnsSlider"
        min="5"
        max="50"
        defaultValue={columns}
        onChange={e => setColumns(e.target.value)}
      />
      <br />
      <label htmlFor="ratioSlider">{`Ratio: ${ratio}`}</label>
      <input
        type="range"
        name="ratioSlider"
        min="0"
        max="1"
        step="0.1"
        defaultValue={ratio}
        onChange={e => setRatio(e.target.value)}
      />
      <br />
      <button onClick={() => generateBoardClick(ratio)}>Generate</button>
    </>
  );
}

export default Settings;
