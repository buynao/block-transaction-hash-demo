import { useState } from 'react';
import { Divider, Button, Input } from 'antd';
import TronWeb from 'tronweb';

function getAddress(node: any): string {
  // return TronWeb.address.fromPrivateKey(node.privateKey);
}
async function createWalletFromMnemonic(mnemonic: string) {
  const tronWeb = new TronWeb({
    fullHost: 'http://api.trongrid.io', // 使用TronGrid的API
    privateKey: '', // 在初始化时不需要私钥
  });
  console.log('>>>>>>>fromMnemonic', mnemonic);
  const account = await tronWeb.fromMnemonic(mnemonic);
  console.log('>>>>>>>account', account);
  return account;
}
function Tron({ mnemonic }: { mnemonic: string }) {
  const [address, setAddress] = useState<undefined | string>('');
  const [extendedKey, setExtendedKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [wallet, setWallet] = useState<null>(null);
  const [derivePath, setDerivePath] = useState('');
  const importWallet = async () => {
    const wallet = await createWalletFromMnemonic(mnemonic);
    setWallet(wallet);
    // setExtendedKey(extendedKey);
    setPrivateKey(wallet.publicKey);
    setAddress(wallet.address);
  };
  const privateKeyToAddress = () => {
    // @ts-ignore
    // const privateKeyBuffer = window.Buffer.from(privateKey, 'hex');
    // const address = tronWeb.address.fromPrivateKey(privateKeyBuffer);
    setAddress(address);
  };
  const deriveAddress = () => {
    if (wallet && derivePath) {
      // const derivedWallet = wallet.derivePath(derivePath);
      // setAddress(getAddress(derivedWallet));
    }
  };
  console.log('wallet', wallet);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 500,
      }}
    >
      <h3>Tron</h3>
      <Button
        style={{ marginTop: 10, width: '100%' }}
        onClick={() => importWallet()}
      >
        导入钱包
      </Button>
      <div style={{ width: '100%', wordWrap: 'break-word' }}>
        <p>
          address
          <Input
            style={{ width: '100%', marginTop: 10 }}
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </p>
        <p>
          extendedKey：
          <Input
            style={{ width: '100%', marginTop: 10 }}
            placeholder="extendedKey"
            value={extendedKey}
            onChange={(e) => setExtendedKey(e.target.value)}
          />
        </p>
        <Input
          style={{ width: '100%', marginTop: 10 }}
          placeholder="输入地址路径"
          value={derivePath}
          onChange={(e) => setDerivePath(e.target.value)}
        />
        <Button
          style={{ marginTop: 10, width: '100%' }}
          onClick={deriveAddress}
        >
          通过 xpub + derive path 推导出 address
        </Button>
        <p>
          privateKey
          <Input
            style={{ width: '100%', marginTop: 10 }}
            placeholder="privateKey"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
          />
        </p>
        <Button
          style={{ marginTop: 10, width: '100%' }}
          onClick={privateKeyToAddress}
        >
          通过 privateKey 推导出 address
        </Button>
      </div>
      <Divider />
    </div>
  );
}

export default Tron;
