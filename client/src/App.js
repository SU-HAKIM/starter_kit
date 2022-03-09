import React, { useState, useEffect } from "react";
import getContract from "./getWeb3";
import Web3 from 'web3';
import "./App.css";
import HakimLogo from "./images/Hakim.svg";

import Navbar from "./components/Navbar";

const baseUrl = "https://ipfs.infura.io/ipfs/";
//TODO: to get ipfs deployed content use `baseUrl${contentHash}`

const App = () => {

  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    let connect = async () => {
      await connectToMetaMask();
    }
    connect()
  }, [])


  const connectToMetaMask = async () => {
    if (typeof window !== undefined && typeof window.ethereum !== undefined) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        let web3 = new Web3(window.ethereum);
        let accounts = await web3.eth.getAccounts();
        const contract = await getContract(web3);//TODO:Import Contract from 'contracts' folder and pass after web3
        setWeb3(web3);
        setContract(contract.contract);
        setAccounts(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.error("Please install Meta Mask")
    }
  }
  return (
    <>
      <Navbar address={accounts} NavText="NavText" />{/*TODO:Change NavText*/}
      <div className="App">
        <header className="App-header">
          <img src={HakimLogo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </>
  );
}


export default App;

