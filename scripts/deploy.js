const hre = require("hardhat");
const fs = require('fs');

async function main() {
  // Step 1: Get the contract factory for Warrior
  const Warrior = await hre.ethers.getContractFactory("Warrior");

  // Step 2: Deploy the contract
  const warrior = await Warrior.deploy();

  // Step 3: Wait for the contract to be deployed
  await warrior.deployed();

  // Step 4: Log the contract address after deployment
  console.log("Warrior contract has been deployed at address:", warrior.address);

  // Step 5: Export the contract address to a file for future reference
  fs.writeFileSync('metadata/contractAddress.js', `
    export const warriorAddress = "${warrior.address}"
  `);
}

// Execute the deployment function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying the Warrior contract:", error);
    process.exit(1);
});

