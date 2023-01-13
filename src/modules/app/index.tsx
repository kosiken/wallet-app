import React, { useEffect, useRef, useState, useDeferredValue } from 'react'
import { useSelector } from 'react-redux'
import { Contract } from 'web3-eth-contract';
import { ABI, ABI_CONTRACT } from '../../constants';
import { useWeb3 } from '../../contexts/Web3Context'
import Badge from '../../design-system/components/Badge'
import BulletPoint from '../../design-system/components/BulletPoint'
import Button from '../../design-system/components/Button'
import Progress from '../../design-system/components/Progress';
import { selectWalletAddress } from './store/selectors'
import { IMaskMixin } from 'react-imask';

const MaskedInput = IMaskMixin(({ inputRef, ...props }) => (
  <input
    {...props}
    type="text"
    ref={inputRef as any}  // bind internal input (if you use styled-components V4, use "ref" instead "innerRef")
  />
));

const progress = [
  { label: 'Sale Pending', active: true },
  { label: 'Sale Live', active: false },
  { label: 'Sale Completed', active: false },
  { label: 'Vesting Started', active: false },
  { label: 'EXX Launched', active: false }
]



export const AppCom = () => {

  const walletAddress = useSelector(selectWalletAddress);
  const [walletBalance, setWalletBalance] = useState(0);

  const [loadingBalance, setLoadingBalance] = useState(false);
  const [raised, setRaised] = useState(0);
  const [max, setMax] = useState(0);
  const { web3, tokenAddress, contractAddress } = useWeb3()
  const tokenRef = useRef<Contract>();
  const presaleRef = useRef<Contract>();
  const [amount, setAmount] = useState('')
  const deferred = useDeferredValue(amount);
  const [exxValue, setExxValue] = useState(0);
  const [buying, setBuying] = useState(false)
  const [hasContributed, setHasContributed] = useState(false);
  const [contributionAmount, setContributionAmount] = useState(0)

  useEffect(() => {
    if (!deferred) {
      return;
    }
    setExxValue(10 * parseFloat(deferred));
  }, [deferred])

  useEffect(() =>{
    if(!walletAddress) {
      setWalletBalance(0);
    }
  }, [walletAddress])
  useEffect(() => {
    const loadBalance = async () => {
      if (!walletAddress) {
        return;
      }
      setLoadingBalance(true);
      try {
      const address = walletAddress;
      const contract = new web3!.eth.Contract(ABI, tokenAddress, {
        from: address
      });
      tokenRef.current = contract
      const balance = await contract.methods.balanceOf(address).call() as string;
      setWalletBalance(parseFloat(balance));
      const con2 = new web3!.eth.Contract(ABI_CONTRACT, contractAddress, {
        from: address,

      })
      presaleRef.current = con2;

      const hardCap = await con2.methods.hardCap().call();
      const raisedBNB = await con2.methods.raisedBNB().call();
      setRaised(parseFloat(raisedBNB));
      setMax(parseFloat(hardCap))
      console.log(raisedBNB, hardCap, balance)
    }
      catch(err) {
        console.log(err);
        window.alert('An error has occurred while loading balances');
      }
      setLoadingBalance(false);
    }
    loadBalance()
  }, [contractAddress, tokenAddress, walletAddress, web3]);


  const performBuy = async () => {
    if(!walletAddress || !tokenRef.current || !presaleRef.current || !web3 || buying) {
      return;
    }
    setBuying(true)
    try {
    const address = walletAddress;
    let gasprice: any = await web3.eth.getGasPrice();
    gasprice = Math.round(parseInt(gasprice) * 1.2);
    let gas = await  presaleRef.current.methods.buy().estimateGas({from: walletAddress})
    gas =  Math.round(gas * 1.2);
    const privateKey = window.prompt('Enter your private key');
    if(!privateKey) {
      window.alert('Need private key to complete buy');
    }
    web3.eth.accounts.wallet.add(privateKey!);

    const ans =  await presaleRef.current.methods.buy().send({ value: web3!.utils.toHex(Math.floor(0)),   gas: gas, gasPrice: gasprice, sender: address, from: address , address})//.call();
    console.log(ans);
    window.alert('Successfully completed transaction');
    setHasContributed(true);
    setContributionAmount(parseFloat(amount));
  }
    catch(err) {
      console.log(err);
      window.alert('An error has occurred while performing transaction');
    }
    setBuying(false);
  }

  
  
  return (
    <div className="block lg:flex mt-4">
      <div className="flex-1 px-4 mb-4">
        <h5 className="font-bold  text-5xl text-left mb-2">Be an early bird</h5>
        <p className="leading-7 text-left">It would take months before official project launch, so you should buy only if you can wait for the launch to trade your coins.</p>
        <div className="hidden relative mt-4 line-div lg:block">
          {
            progress.map(v => (
              <div key={v.label} className="flex items-center mb-8">
                <BulletPoint active={v.active} />
                <div className="ml-4">
                  <h5 className="inline mr-2 text-xl font-bold">{v.label}</h5>
                  {v.active && (<span className="text-success text-sm">
                    In Progress
                  </span>)}
                </div>
              </div>
            ))
          }

        </div>
      </div>
      <div className="flex-1 max-w-[550px] px-4" >
        <div className="text-left mb-2">
       <Button color="secondary" className="bg-secondary items-center text-primary text-center">
            <p className="text-center text-primary">{loadingBalance ? 'Loading' : 'Your bal: ' + walletBalance.toFixed(10) + ' USDT'}</p>
          </Button>
        </div>

        <div className="bg-white pt-4 pb-2 px-4 rounded-lg">
          <div className="flex justify-between items-center mb-8">
            <h5 className="text-l font-bold">10:20:30</h5>
            <Badge >Pending</Badge>
          </div>
          <div className="mb-8">
            <p className="text-gray text-left mb-4">
              Sale Progress
            </p>
            {max > 0 && (<Progress progress={raised / max} />)}
          </div>

          <div className="mb-4 flex">
            <div className="flex-1 mr-2 flex py-4 border-primary border rounded-xl px-[20px] items-center">
              <MaskedInput mask={[
                { mask: '' },
                {
                  mask: 'num USDT',
                  lazy: false,
                  blocks: {
                    num: {
                      mask: Number,
                      scale: 20,
                      thousandsSeparator: '',
                      padFractionalZeros: true,
                      radix: '.',

                    }
                  }
                }
              ]}
                unmask={true as any}
                onAccept={(value) => {
                  setAmount(value);

                }}
                className="bg-transparent outline-none block flex-1" placeholder="Enter amount you want to buy (USDT)" />
              {!!amount && (<div className="border-l border-black pl-[10px] opacity-70 text-sm">
                <span>{exxValue === 0 ? '00.00' : exxValue.toFixed(2)}EXX</span>
              </div>
              )}
            </div>
            <Button className="text-white" onClick={performBuy}>{buying ? 'Loading' : 'Buy'}</Button>
          </div>
          <div className="mb-8 text-sm flex">
            <p className="mr-4">
              <span className="text-gray">
                Min. Buy:&nbsp;
              </span>
              <span className="font-bold">30 USDT</span>
            </p>
            <p >
              <span className="text-gray">
                Max. Buy:&nbsp;
              </span>
              <span className="font-bold">10,0000 USDT</span>
            </p>
          </div>

          <div className="mt-4 mb-8 text-left">
            <h6 className="font-bold mb-2">Disclaimer</h6>
            <p className="font-light text-xs">The information provided shall not in any way constitute a recommendation as to whether you should invest in any product discussed. <span className="font-bold">We accept no liability for any loss.</span></p>

          </div>
        </div>
   {hasContributed && (     <div className="my-4 bg-[#C5F3F0] rounded-lg p-4">
        <h6 className="font-bold text-left mb-2">Your contribution</h6>
        <div className="mb-8 text-sm flex">
            <p className="mr-4 text-left font-light">
              You contributed&nbsp;
              <span className="font-bold">{contributionAmount} USDT</span>
            </p>
            <p className="font-light">
              You have&nbsp;
              <span className="font-bold">{(contributionAmount * 10)} EXX</span>
            </p>
          </div>
        </div>
)}
      </div>
    </div>
  )
}


/**
 * 
 *    const connectWallet = async () => {
    if(!web3) {

      return;
    }
    
    const address = "0x6Dda73e9b1128be7F163f6d46523D4Ab10525eCd";
    const contract = new web3!.eth.Contract(ABI,tokenAddress , {
      from: address
    } );

    const con2 = new web3!.eth.Contract(ABI_CONTRACT, contractAddress, {
      from: address,
      gasPrice: '0',
    })
    
    // const balance = await contract.methods.balanceOf(addrss).call();
    // console.log( balance)
    try {
      let gasprice: any = await web3.eth.getGasPrice();
      gasprice = Math.round(parseInt(gasprice) * 1.2);// 
    // const signed = await web3.eth.accounts.signTransaction({
    //   gas: gasLimit,
    //   data: encoded
    // }, '9b951168963643b2458861b4dd92a0fee1376353a4ca267a24be82d33dcf2b2e');

    web3.eth.accounts.wallet.add('9b951168963643b2458861b4dd92a0fee1376353a4ca267a24be82d33dcf2b2e');

    let gas = await con2.methods.buy().estimateGas({from: address})
      gas =  Math.round(gas * 1.2);
    const ans =  await con2.methods.buy().send({ value: web3.utils.toHex(0),   gas: gas, gasPrice: gasprice, sender: address, from: address , address})//.call();
    console.log(ans);
 */
