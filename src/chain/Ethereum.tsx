import { useState } from 'react';
import { Divider, Button, Input } from 'antd';
import { Transaction, HDNodeWallet } from 'ethers';
const txStr = {
  to: '0xE6F4142dfFA574D1d9f18770BF73814df07931F3',
  nonce: 6,
  gasLimit: 21000,
  value: 0,
  chainId: 5,
  type: 2,
  maxFeePerGas: 18,
  maxPriorityFeePerGas: 2,
  accessList: [],
};
const mnemonicStr = '';
function Ethereum() {
  const [mnemonic, setMnemonic] = useState(mnemonicStr);
  const [tx, setTx] = useState(txStr);
  const transaction = new Transaction();
  transaction.to = tx.to;
  transaction.nonce = tx.nonce;
  transaction.gasLimit = tx.gasLimit;
  transaction.value = tx.value;
  transaction.chainId = tx.chainId;
  transaction.type = tx.type;
  transaction.maxFeePerGas = tx.maxFeePerGas;
  transaction.maxPriorityFeePerGas = tx.maxPriorityFeePerGas;
  transaction.accessList = tx.accessList;
  // const [path, setPath] = useState('');
  const [msg, setMsg] = useState<undefined | string>('');
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState<HDNodeWallet | null>(null);
  const [derivePath, setDerivePath] = useState("m/44'/60'/0'/0/0");
  const importWallet = () => {
    const HDWallet = HDNodeWallet.fromPhrase(mnemonic, '', derivePath);
    setWallet(HDWallet);
  };
  const onSignMessage = async () => {
    setLoading(true);
    try {
      const signature = await wallet?.signTransaction(transaction);
      setMsg(signature);
    } catch (e) {
      if (e instanceof Error) {
        setMsg(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 500,
      }}
    >
      <h3>Ethereum</h3>
      <p>通过助记词初始化生成 Wallet: {wallet?.address}</p>
      <Input
        style={{ width: '100%' }}
        placeholder="输入助记词"
        value={mnemonic}
        onChange={(e) => setMnemonic(e.target.value)}
      />
      <Input
        style={{ width: '100%', marginTop: 10 }}
        placeholder="输入地址路径"
        value={derivePath}
        onChange={(e) => setDerivePath(e.target.value)}
      />
      <Button
        style={{ marginTop: 10, width: '100%' }}
        onClick={() => importWallet()}
      >
        导入钱包
      </Button>
      {wallet && (
        <div style={{ width: '100%', wordWrap: 'break-word' }}>
          <p>使用 Wallet 签署 Transaction</p>
          <Input.TextArea
            value={JSON.stringify(tx, null, 2)}
            onChange={(e) => {
              if (e.target.value) {
                try {
                  const txStr = JSON.parse(e.target.value);
                  setTx(txStr);
                } catch (e) {
                  console.log('>>>>>e', e);
                }
              }
            }}
            style={{ height: 280, resize: 'none', width: '100%' }}
          />
          <p>unsignedHash: {transaction?.unsignedHash}</p>
          {msg && <p>sign result: {msg}</p>}
          <Button
            style={{ marginTop: 10, width: '100%' }}
            onClick={() => onSignMessage()}
            loading={loading}
          >
            签名
          </Button>
        </div>
      )}
      <Divider />
    </div>
  );
}

export { Ethereum };
