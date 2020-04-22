import React from 'react';
import TableComp from './components/Table';
import './App.css';

function App() {
  return (
    <div className="App">
      <TableComp mode="dark" />
      <TableComp mode="light" />
    </div>
  );
}

export default App;
