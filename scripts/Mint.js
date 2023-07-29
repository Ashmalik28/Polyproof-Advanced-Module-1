const { ethers } = require("hardhat");

async function main() {
  const warriorContractAddress = "0xaE2C0E43dAe7ee032157092dEff26D71D774e65f"; // Replace with the deployed contract address
  const warriorContractABI = require("../artifacts/contracts/Warrior.sol/Warrior.json").abi; // Replace with the ABI of the deployed contract
  const provider = ethers.getDefaultProvider("goerli"); // Replace with the desired network (e.g., "mainnet", "ropsten", "rinkeby", etc.)

  const signer = new ethers.Wallet(" your wallet private key ", provider); // Replace with your private key
  const warriorContract = new ethers.Contract(warriorContractAddress, warriorContractABI, signer);

  const nftUrl = "https://gateway.pinata.cloud/ipfs/QmZ5ecTyWiftvYP5JqHuHhFLU2dU97uZ7FPG84w6JbKqNu/"; // Replace with the URL for your NFT metadata

  try {
    const transaction = await warriorContract.mint(nftUrl, { value: ethers.utils.parseEther("0.01") });

    await transaction.wait();

    console.log("Successfully minted 5 NFTs!");
  } catch (error) {
    console.error("Error minting NFTs:", error);
  }
}

main();
