import React from "react";
import ReactDOM from "react-dom";
import Board from "./board";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Board rows={10} columns={5} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
