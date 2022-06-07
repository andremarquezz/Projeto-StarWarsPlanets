import React from 'react';
import './App.css';
import { ProviderContext } from './context';
import TableStarWars from './pages/TableStarWars';

function App() {
  return (
    <ProviderContext>
      <TableStarWars />
    </ProviderContext>
  );
}

export default App;
