import React from 'react'
import { Button, Container, Flex, Input, VStack } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useMoralis } from "react-moralis";
import { useNavigate } from 'react-router';
const pokemonnftjson = require("./MYNFT.json")
const secret = require('./secret.json');

export default function MINT() {
  //Moralis 
  const { authenticate, isAuthenticated, isAuthenticating, logout, authError } = useMoralis();
  const abi = pokemonnftjson.abi
  const provider = new ethers.providers.InfuraProvider("maticmum", secret.project_id)
  const wallet = new ethers.Wallet(secret.key, provider)
  const signer = wallet.connect(provider)
  console.log(signer)
  const to_MYNFT = new ethers.Contract(secret.contract_address, abi, signer)
  console.log(to_MYNFT)

  const rollfunc = async () => {
    try {
      const name = await to_MYNFT.name()
      console.log(name)
      await to_MYNFT.rollDice('0xD6720e495F1B1011a079b21592CFf2e091e6cC46', { gasLimit: 500000 });//error
      // console.log(rollin)
    } catch (error) {
      console.log(error)
    }

  }

  async function mintcall() {
    console.log("Running mint")

    //Intitialise
    console.log("before initialising")
    console.log("before house")
    // //House
    const the_link = await to_MYNFT.house('0xD6720e495F1B1011a079b21592CFf2e091e6cC46', { gasLimit: 5000000 })
    console.log(the_link);
    const removing_the_acuiredlink = await to_MYNFT.resettherandomvalue('0xD6720e495F1B1011a079b21592CFf2e091e6cC46', { gasLimit: 500000 })
    console.log(removing_the_acuiredlink)
    // //Mint
    console.log("PROCEED TO MINT")
    await to_MYNFT.mint(the_link)
    console.log('NFT minted!')
  }
  let navigate2 = useNavigate();
  const Logthemout = () => {

    logout();
    navigate2("/");

  }





  return (
    <Flex minHeight='100vh' width='full' align='center' justifyContent='center' backgroundColor={"#008080"}>
      <VStack  spacing='14' >
        <Button onClick={rollfunc} size={"lg"}  >Roll 🎲</Button>
        <Button onClick={mintcall} size={"lg"}>Mint 👷‍♂️</Button>
        <Button onClick={() => Logthemout()} size={"lg"}>Logout ◀️</Button>
      </VStack>
    </Flex>
    )
}

