import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Chain from './chain/index';
function App() {
  return (
    <>
      <Chain.Ethereum />
    </>
  );
}

export default App;
