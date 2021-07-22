import React from 'react'
import './App.css'
import Journal from './Journal'

// INSERT INTO codewitch (focus, tarot, journal, gratitude, moon_phase, self_care, meta) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;

function App() {
  return (
    <div className="App">
      <Journal />
    </div>
  );
}

export default App;
