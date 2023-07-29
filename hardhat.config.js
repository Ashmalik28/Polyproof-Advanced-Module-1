require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// Your Pinata API key and secret for accessing the NFT metadata and assets
const pinataApiKey = "e9160f98c696519ed80a";
const pinataSecretApiKey = "mOqUmCUahHtp3z2MWr6yBSbeJhdXJfSM";

// Hardhat configuration
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    goerli: {
      url: "https://goerli.infura.io/v3/4aeaaef098944254b59c2338dae8cb84", // Replace with your Infura or Alchemy Goerli URL
      accounts: {
        mnemonic: "    ", // Replace with your Goerli testnet wallet mnemonic
      },
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com", // Replace with the Matic Mumbai testnet RPC URL
      accounts: {
        mnemonic: "initial jelly survey reduce clinic laugh twelve sad final puzzle used dumb", // Replace with your Mumbai testnet wallet mnemonic
      },
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: "DIGZ3SIY8418XRJX2WSYC2J8DMGFM1QG44", // Replace with your Etherscan API key for contract verification
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: false,
    disambiguatePaths: false,
  },
};
