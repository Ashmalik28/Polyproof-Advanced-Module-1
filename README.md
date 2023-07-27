# Warrior NFT Collection - Ethereum Goerli to Mumbai Testnet Migration

In this project, we wil deploy an NFT collection on the Ethereum blockchain - goerli testnet, Map the collection to Polygon Mumbai network, and Transfer assets over via the Polygon Bridge using FXportal Bridging.

## Contract Info 📑

The Warrior NFT Collection is a smart contract built on the Ethereum blockchain. Originally deployed on the Ethereum Goerli testnet, it allows users to mint unique warriors as non-fungible tokens (NFTs). Each warrior represents a distinct race and culture within the Shattered Realms, and users can design these warriors with custom attributes, appearances, attires, and weapons that reflect their heritage and personalities.

## Contract Details 

**Name:** Warrior
**Symbol:** WRS

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

2. Install the necessary dependencies:

```bash
npm install
```

## Deployment

Before deploying the ERC721 contract, provide your wallet private key where required, i.e., `PRIVATE_KEY= 'your wallet private key'`. To deploy the ERC721 contract named "Warrior" to the Goerli Ethereum Testnet, run the following command:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

_Note: After deploying, copy the generated address into `contractAddress.js` (stored in the metadata folder) and `batchMint.js` (stored in the scripts folder)._

## Batch Mint NFTs

This command will mint the NFTs:

```bash
npx hardhat run scripts/Mint.js --network goerli
```

## Approve and Deposit NFTs to Polygon Mumbai

This command will use the FxPortal Bridge to approve and deposit the minted NFTs from Ethereum to the Polygon Mumbai network.

```bash
npx hardhat run scripts/Transfer.js --goerli
```

## Check NFT Wallet Balance

To check the balance of the NFT wallet on the Polygon Mumbai network, run the following command:

```bash
npx hardhat run checkBalance.js --network mumbai
```

## Contract Functions

1) **mint(string calldata nftUrl) external payable:** Allows users to mint warriors as NFTs. Each minting transaction can include up to 5 warriors. The caller must provide a metadata URL (nftUrl) for the warriors.

2) **setBaseURI(string memory newBaseUrl) external onlyOwner:** Allows the contract owner to update the base URL used for constructing metadata URLs for the warriors.

3) **updatePromptDescription(string memory newDescription) external onlyOwner:** Allows the contract owner to update the prompt description for minting warriors.

4) **setTokenAttributes(uint256 tokenId, string memory attributes) external onlyOwner:** Allows the contract owner to set custom attributes for a specific warrior NFT.

5) **getTokenAttributes(uint256 tokenId) external view returns (string memory):** Allows anyone to retrieve the custom attributes associated with a warrior NFT.

6) **getTokenUrl(uint256 tokenId) external view returns (string memory):** Allows anyone to retrieve the metadata URL of a warrior NFT.

7) **totalSupply() public view returns (uint256):** Returns the total number of warriors minted so far.

8) **tokensMintedByAddress(address account) external view returns (uint256):** Returns the number of warriors minted by a specific address.

9) **withdraw() external onlyOwner:** Allows the contract owner to withdraw the contract's balance.

## License 🧾

This project is licensed under the [MIT License]- // SPDX-License-Identifier: MIT
