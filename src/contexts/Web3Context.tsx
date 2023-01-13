import Web3 from 'web3';
import React, { useContext, useEffect, useState } from 'react'

// 0x222E6559C555e75e437f9e0c3292941B14814E73 0x222E6559C555e75e437f9e0c3292941B14814E73

export const Web3Context = React.createContext<{
  web3?: Web3; setWeb3: (w: any) => void; tokenAddress?: string;
  contractAddress?: string;
  settingNetwork: boolean;
  walletType?: 'metamask' | 'wallet-connect';
  setWalletType: (w: 'metamask' | 'wallet-connect' | undefined) => void
}>({
  setWeb3: () => { },

  setWalletType: () => {

  },
  settingNetwork: false,

});




export const Web3Provider: React.FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3 | undefined>();
  const [walletType, setWalletType] = useState<'metamask' | 'wallet-connect' | undefined>();
  const [settingNetwork, setSettingNetwork] = useState(false)

  useEffect(() => {
    async function connectToWeb3() {
      setSettingNetwork(true)
      if (!walletType) {
        setSettingNetwork(false)
        return;
      }
      const w = window as any
      if (typeof w.ethereum === 'undefined' && walletType === 'metamask') {
        window.alert('MetaMask is not installed, Please install MetaMask Browswer extension');
        setSettingNetwork(false)
        return;
      }

      try {
        // Request account access
        await w.ethereum.enable();
        // Connect to web3 provider
        const web3 = new Web3(
          walletType === 'metamask' ? w.ethereum : new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545")
        );
        web3.eth.handleRevert = true;
        setWeb3(web3);
      } catch (error) {
        console.log(error);
        window.alert('An error occurred while setting up')
      }
      setSettingNetwork(false);
    }
    connectToWeb3();
  }, [walletType]);

  return (
    <Web3Context.Provider
      value={{
        web3,
        setWeb3,
        tokenAddress: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd',
        contractAddress: '0xDA497727316FBDD71D2b555041035c6641c0D85F',
        setWalletType: setWalletType,
        settingNetwork,
        walletType,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
