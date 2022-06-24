const {ethers,upgrades}=require("hardhat");

async function main(){
  //FIRST
  const Pokemon_NFT=await ethers.getContractFactory("MYNFT");
  const pokemon=await upgrades.deployProxy(Pokemon_NFT,{kind:'uups'});
  await pokemon.deployed()
  console.log(`NFT Contract successfully deployed to ${pokemon.address}`)

// const newItemId=await pokemon.mint("https://ipfs.io/ipfs/QmPpSV53hse5xxgCEpy1BoKvJfQ7JTbdTLSBDCv9y4ukup")
// console.log(`NFT minted successfully :: ${newItemId}`)

}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
