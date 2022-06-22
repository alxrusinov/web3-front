import logo from './logo.svg';
import './App.css';
import Web3 from 'web3'
import {useEffect, useState} from "react";
import ABI from './tokenABI.json'

const account = '0xF59b7b20f118649e4C23511C61E15a12726Ad4aD'
const host = 'https://ropsten.infura.io/v3/c1d367d786994a5685ae3b3d30865974'
const contractAddress = '0x2b593a9819a9a122d1647e24b605da7e7aee6e5d'


function App() {
  const [balance, setBalance] = useState()
  const [contract, setContract] = useState()
  const [currentWeb3, setCurrentWeb3] = useState()
  const [account, setAccount] = useState()

  const getBalance =async  () => {
    let balance = await currentWeb3?.eth.call({
      to: account,
      data: contract?.methods.balance
    })
    setBalance(balance)
  }


  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider ||  new Web3.providers.HttpProvider(host));
      const contract = await new web3.eth.Contract(ABI, contractAddress)
      const accounts = await web3.eth.requestAccounts();

      setAccount(accounts[0]);
      setContract(contract)
      setCurrentWeb3(web3)
    }

    load();
  }, []);


  return (
    <div className="App">
      <div>
        {account && <div className={'account'}>Your account: {account}</div>}
        <button className={'button'} onClick={getBalance}>Get balance</button>
        Your balance is - {balance}
      </div>
    </div>
  );
}

export default App;
