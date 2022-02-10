import React, { Component } from "react";
import getContract from "./getWeb3";
import Web3 from 'web3';
import "./App.css";
// import Todo from './contracts/Todo.json';


class App extends Component {

  state = {
    web3: null,
    accounts: null,
    contract: null
  }

  componentDidMount = async () => {

  }

  connectToMetaMask = async () => {
    if (typeof window !== undefined && typeof window.ethereum !== undefined) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        let web3 = new Web3(window.ethereum);
        let accounts = await web3.eth.getAccounts();
        const contract = await getContract(web3);
        this.setState({
          web3,
          accounts,
          contract
        })
      } catch (error) {
        console.log(error);
      }
    } else {
      console.error("Please install Meta Mask")
    }
  }
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <header className="header">
          <div className="container">
            <div className="header__title">
              Decentralized TODO Application
            </div>
            <div className="header__actions">
              <button className="header__connect-button" onClick={this.connectToMetaMask}>Connect MetaMask</button>
            </div>
          </div>
        </header>
        {this.state.web3 && <main className="todo">
          <div className="container">
            <div className="todo__creation">
              <form className="todo__form">
                <input type='text' name='content' placeholder="Todo text" className="todo__field" />
                <input type='text' name='author' placeholder="Todo author" className="todo__field" />
                <button className="todo__submit " type="submit">Create</button>
              </form>
            </div>
            <div className="todo__show">
              <ul className="todo__list">
                <li className="todo__list-item">
                  <p className="todo__text">
                    <span className="todo__text-top">
                      Item One
                    </span>
                    <span className="todo__text-bottom">
                      Hakim | {new Date().toLocaleString()}
                    </span>
                  </p>
                  <div className="todo__actions">
                    <button className="todo__button">Done</button>
                    <button className="todo__button">Edit</button>
                  </div>
                </li>
                <li className="todo__list-item">
                  <p className="todo__text">
                    <span className="todo__text-top">
                      Item Two
                    </span>
                    <span className="todo__text-bottom">
                      Hakim | {new Date().toLocaleString()}
                    </span>
                  </p>
                  <div className="todo__actions">
                    <button className="todo__button">Done</button>
                    <button className="todo__button">Edit</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </main>}
      </div>
    );
  }
}

export default App;
