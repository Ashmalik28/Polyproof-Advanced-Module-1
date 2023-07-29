const { ethers } = require("hardhat");
const { FXRootContractAbi } = require('../abis');
const ABI = require('../artifacts/contracts/Warrior.sol/Warrior.json');
require('dotenv').config();

async function main() {
  const networkAddress = 'https://goerli.infura.io/v3/4aeaaef098944254b59c2338dae8cb84';
  const privateKey = ' Your private key ';
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);

  const signer = new ethers.Wallet(privateKey, provider);

  const NFT = await ethers.getContractFactory("Warrior");
  const nft = await NFT.attach('0xaE2C0E43dAe7ee032157092dEff26D71D774e65f');  //Update the deployment address here

  const fxRootAddress = '0xF9bc4a80464E48369303196645e876c8C7D972de';
  const fxRoot = await ethers.getContractAt(FXRootContractAbi, fxRootAddress);

  const tokenIds = [1, 2, 3, 4, 5];

  // Approve fxRootAddress for managing signer's NFTs
  const approveTx = await nft.connect(signer).setApprovalForAll(fxRootAddress, true);
  await approveTx.wait();
  console.log('Transfer Approval confirmed');

  // Replace this with the actual Mumbai address obtained from mapping
  const receiverMumbaiAddress = '0x6c8EC27177122CFE0391e6B932CC65fe962d1957'; // Mumbai address

  for (let i = 1; i < tokenIds.length; i++) {
    const tokenId = tokenIds[i];

    const depositTx = await fxRoot.connect(signer).deposit(
      nft.address,
      receiverMumbaiAddress,
      tokenId,
      '0x6566'
    );

    await depositTx.wait();
    console.log(`NFT ${tokenId} transferred and deposited to Mumbai address ${receiverMumbaiAddress}`);
  }

  console.log("Approved and deposited");

  // Note: You may want to wait for the Polygon network confirmation before checking the balance
  // To do so, consider using a delay function or other methods for waiting.

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
