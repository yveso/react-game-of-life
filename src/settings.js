import React from "react";
import styled from "styled-components";

const Label = styled.label`
  display: block;
  margin: 55px 5px 15px 0px;
`;

function Slider({ name, value, setValue, min, max, step = 1 }) {
  return (
    <>
      <Label htmlFor={name + "Slider"}>
        {name}: <strong>{value}</strong>
      </Label>
      <span>{min}</span>
      <input
        type="range"
        name={name + "Slider"}
        defaultValue={value}
        min={min}
        max={max}
        step={step}
        onChange={e => setValue(e.target.value)}
      />
      <span>{max}</span>
    </>
  );
}

function Settings({
  settings: {
    rows,
    setRows,
    columns,
    setColumns,
    ratio,
    setRatio,
    generateBoardClick
  }
}) {
  function submit(e) {
    e.preventDefault();
    generateBoardClick(ratio);
  }

  return (
    <form>
      <h1>Create a board</h1>

      <Slider name="Rows" value={rows} setValue={setRows} min="5" max="50" />
      <Slider
        name="Columns"
        value={columns}
        setValue={setColumns}
        min="5"
        max="50"
      />
      <Slider
        name="Ratio"
        value={ratio}
        setValue={setRatio}
        min="0"
        max="1"
        step="0.1"
      />

      <button
        onClick={e => submit(e)}
        style={{ display: "block", margin: "30px" }}
      >
        Generate
      </button>
    </form>
  );
}

export default Settings;
