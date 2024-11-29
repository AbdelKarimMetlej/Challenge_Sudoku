// App.tsx
import React from "react";
import Game from "./screens/Game/Game"; // Import the Game screen

import "./App.css"; // Import custom CSS styles

// Functional component for App
const App: React.FC = () => {
  return (
    <div className="App">
      <Game /> {/* Render the Game component */}
    </div>
  );
};

export default App;
