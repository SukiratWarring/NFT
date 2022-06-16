import './App.css';
import React from 'react';
import {ethers} from 'ethers'
// const { ethers } = require("hardhat")
const pokemonnftjson = require("./MYNFT.json")


function App() {
  
  async function mintcall() {
    console.log("INSIDE MINT")
    const abi = pokemonnftjson.abi
    const provider = new ethers.providers.InfuraProvider("maticmum", process.env.project_id)
    const wallet = new ethers.Wallet(process.env.key, provider)
    const signer = wallet.connect(provider)
    const cryptoBeetles = new ethers.Contract(process.env.contract_address, abi, signer)
    await cryptoBeetles.mint("https://ipfs.io/ipfs/QmbirBnDzU8ZCdGXsMJhk34F8Y8PozhyFNcBw3pTo9wqHL")
    console.log('NFT minted!')
  }  

  return (
    <div className="App">
      <button onClick={mintcall}>Mint</button>
      
    </div>
  );
}

export default App;