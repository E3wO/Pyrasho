// App.js - Root application container; Primarily serves as an entry point and container for the Game component.

import React from "react";
import Game from "./Game";

function App() {
  return (
    <div className="App">
      <Game /> {/* The central game orchestrator. Determines and renders the appropriate scene within the app. */}
    </div>
  );
}

export default App;
