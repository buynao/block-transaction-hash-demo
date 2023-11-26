import './App.css';
import React, { useState } from 'react';
import { Ethereum, Bitcoin, Tron } from './chain/index';
import { Input } from 'antd';

function App() {
  const mnemonicStr =
    'hope scan cruel dizzy slender pass final defy south subject title crush';
  const [mnemonic, setMnemonic] = useState(mnemonicStr);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 500,
      }}
    >
      <Input
        style={{ width: '100%' }}
        placeholder="输入助记词"
        value={mnemonic}
        onChange={(e) => setMnemonic(e.target.value)}
      />
      <Ethereum mnemonic={mnemonic} />
      <Bitcoin mnemonic={mnemonic} />
      <Tron mnemonic={mnemonic} />
    </div>
  );
}

export default App;
