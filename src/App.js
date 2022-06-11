import React from 'react';
// import '../dist/output.css';
import './index.css';
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
