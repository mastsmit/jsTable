import React from 'react';
import TableComp from './components/Table';
import { theme } from './consts/themeColors';
import './App.css';

function App() {
  const darkColors = theme.color.dark;
  const lightColors = theme.color.light;
  return (
    <div className="App">
      <TableComp colors={darkColors} />
      <TableComp colors={lightColors} />
    </div>
  );
}

export default App;
