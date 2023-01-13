/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3 } from '../../../contexts/Web3Context';
import Button from '../../../design-system/components/Button';
import { Icon } from '../../../design-system/components/Icon';
import { IconNames } from '../../../design-system/components/Icon/icons';
import { setWalletAddress, disconnectWallet } from '../store/actions';
import { selectWalletAddress} from '../store/selectors';


const Header = () => {
    const [navOpen, setNavOpen] = useState(false);
    const { web3, settingNetwork, walletType, setWalletType,} = useWeb3();
    const [open, setOpen] = useState(false);
    const [addressInput, setAddressInput] = useState('');
    const dispatch = useDispatch();
    const walletAddress =  useSelector(selectWalletAddress);
    const [localWallets, setLocalWallets] = useState<string[]>([])

    const walletMangeled = useMemo(() => {
        if(!walletAddress) {
            return '';
        }
        return walletAddress.slice(0, 8) + '........' + walletAddress.slice(walletAddress.length - 5);
    }, [walletAddress])
    const toggleNav = () => {
        setNavOpen(!navOpen);
    }
    const toggleModal = () => setOpen(o => !o);
    const changeWalletAddress: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setAddressInput(e.target.value);
    }
    const onSelectWallet = (w: typeof walletType) => {
        setWalletType(w!);
    }
    const onSelectWalletFromList = (wallet: string) => {
        dispatch(setWalletAddress(wallet));
        toggleModal();
    }
    const disconnect = () => {
        setWalletType(undefined);
        dispatch(disconnectWallet());
    }
    useEffect(() => {
        if(!walletAddress && addressInput && web3 && !settingNetwork && walletType === 'wallet-connect') {
            dispatch(setWalletAddress(addressInput));
            toggleModal();
        }
    
    }, [walletAddress, web3, addressInput, dispatch, settingNetwork, walletType]);

    useEffect(() => {
        const getAccounts = async() => {
        if(web3 && walletType === 'metamask') {
            const ans = await web3.eth.requestAccounts();
            setLocalWallets(ans)
            console.log(ans, web3, walletType);
        }
    }
    getAccounts();
    }, [walletType, web3]);

    
    return (
        <header className="flex w-full flex-wrap justify-between px-8 items-center content-center py-[24px]">

            <h5 className="font-bold">Logo Here</h5>

            <button onClick={toggleNav} type="button" className="inline-flex items-center lg:hidden" aria-controls="navbar-dropdown" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <Icon name={IconNames.HAMBURGER} />
            </button>

            <div className="w-full lg:w-auto flex-grow md:block">
                <div className={(navOpen ? 'block' : 'hidden') + " lg:flex lg:space-x-4 items-center justify-end"}>


                    <a href="#" className="block  text-left ml-0 mt-4 lg:mt-0 lg:inline-block lg:mt-0 ">
                        <Button color="secondary" className="bg-transparent ">
                            <p className="text-primary flex items-center text-primary">
                            <Icon color="inherit" name={IconNames.DOWNLOAD} /> <span className="ml-2 text-black">Download  Tokenomics</span>

                            </p>
                        </Button>
                    </a>
                    {web3 && (            <a href="#" className="block  text-left ml-0 mt-4 lg:mt-0 lg:inline-block lg:mt-0 ">
                        <Button color="secondary" className="bg-secondary flex items-center">
                            <img src={require('./binance.png')} alt="binance-logo" /> <span className="ml-2">BSC Mainnet</span>
                        </Button>
                    </a>
)}

              {!!walletAddress ? ( <a href="#" className="block tooltip-target  text-left ml-0 mt-4 lg:mt-0 lg:inline-block lg:mt-0 relative">
                        <Button onClick={disconnect} color="secondary" className="bg-secondary flex items-center text-primary">
                            <p className="text-primary">{walletMangeled}</p>
                        </Button>
                        <div className="absolute bg-white w-full top-[120%] py-4 rounded-2xl tooltip left-0">
                            <p className="text-center text-sm font-bold">Disconnect Wallet</p>
                        </div>
                    </a>): (   <a href="#" className="block text-left ml-0 mt-4 lg:mt-0 lg:inline-block lg:mt-0 ">
                        <Button className="flex items-center px-[28px]" onClick={toggleModal}>
                            <span className="mr-2">Connect Wallet</span> <Icon viewBox="0 0 16 16" size={{ width: 15, height: 13 }} color="white" name={IconNames.ARROW_UP} />
                        </Button>
                    </a>)}

                </div>
            </div>
            <Modal isOpen={open || settingNetwork}>
                <Button disabled={settingNetwork} className="text-red" onClick={toggleModal}>Close</Button>

                <div className="w-full h-full px-4 flex justify-center items-center">
                    <div>
                  {settingNetwork && (      <div className="mb-4">
                            <p>Loading...</p>
                        </div>)}
                    <div className="mb-8">
                    <div className="mb-4 flex">
            <div className="flex-1 mr-2 min-w-[450px] flex py-4 border-primary border rounded-xl px-[20px] items-center">
              <input
                className="bg-transparent outline-none block flex-1" placeholder="Enter your Wallet Address"  value={addressInput} onChange={changeWalletAddress} />
   
            </div>
          </div>

                </div>
                <div className="text-center">
                    <Button disabled={settingNetwork} color={walletType === 'metamask' ? 'primary' : 'secondary'} className="mr-2" onClick={onSelectWallet.bind(null, 'metamask')}>
                        Metamask
                    </Button>
                    <Button disabled={settingNetwork || addressInput.length < 41} color={walletType === 'wallet-connect' ? 'primary' : 'secondary'} onClick={onSelectWallet.bind(null, 'wallet-connect')}>
                        Wallet Connect
                    </Button>
                </div>
                {localWallets.length && (
                    <p className="mb-4">
                        You can also Select one of these Metamask wallets
                    </p>
                )}
                <div className="mb-4">
                    {localWallets.map(w => (
                        <Button key={w} onClick={onSelectWalletFromList.bind(null, w)}>
                            {w}
                        </Button>
                    ))}
                </div>
                    </div>
                </div>

            </Modal>
        </header>
    )
}

export default Header;