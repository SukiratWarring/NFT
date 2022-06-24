const pokemonnftjson = require("../artifacts/contracts/MYNFT.sol/MYNFT.json")
const {ethers}=require("hardhat");

async function main() {
  const abi = pokemonnftjson.abi
  const provider = new ethers.providers.InfuraProvider("maticmum", process.env.project_id)
  const wallet = new ethers.Wallet(process.env.key, provider)
  const signer = wallet.connect(provider)
  const pokemon_to_contract = new ethers.Contract(process.env.contract_address, abi, signer)
  await pokemon_to_contract.mint("https://ipfs.io/ipfs/QmXiPyK7o8jsrnxdRuavhCYqxuLVw9mzgw9iddgbnrHGCj")
  console.log('NFT minted!')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });