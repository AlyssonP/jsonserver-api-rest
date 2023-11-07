import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Renderizando a aplicação react e linkando ao elemento HTML de id "root".
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
