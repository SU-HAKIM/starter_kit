import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import "./App.css";
import Todo from './contracts/Todo.json';


class App extends Component {

  state = {
    web3: null,
    accounts: null,
    contract: null
  }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Todo.networks[networkId];
      const contract = new web3.eth.Contract(Todo.abi, deployedNetwork && deployedNetwork.address);
      this.setState({
        web3, accounts, contract
      })
    } catch (error) {
      alert("Failed to load web3,accounts,contract.For more info see console");
      console.log(error);
    }
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
