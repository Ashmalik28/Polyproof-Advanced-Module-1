// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Warrior is ERC721Enumerable, Ownable {
    uint256 public constant maxMintPerTransaction = 5;
    uint256 private totalMinted;
    string public promptDescription = "Design five unique warriors, each representing a different race and culture within the Shattered Realms. Let their appearances, attires, and weapons reflect their heritage and personalities.";
    string private baseUrl = "https://gateway.pinata.cloud/ipfs/QmZ5ecTyWiftvYP5JqHuHhFLU2dU97uZ7FPG84w6JbKqNu/";

    mapping(address => uint256) private tokensMinted;
    mapping(uint256 => string) private tokenAttributes;
    mapping(uint256 => string) private tokenUrls;

    event NFTMinted(address indexed minter, uint256 tokenId);

    constructor() ERC721("Warrior", "WRS") {}

    function mint(string calldata nftUrl) external payable {
        require(totalMinted + maxMintPerTransaction <= 5, "Exceeds maximum collection size");
        require(msg.value >= maxMintPerTransaction * 0.001 ether, "Insufficient Ether sent");
        require(tokensMinted[msg.sender] + maxMintPerTransaction <= maxMintPerTransaction, "Exceeds maximum minting limit per address");

        for (uint256 i = 0; i < maxMintPerTransaction; i++) {
            totalMinted++;
            uint256 tokenId = totalMinted;
            tokensMinted[msg.sender]++;
            _mint(msg.sender, tokenId);
            tokenAttributes[tokenId] = ""; // Set empty attributes for now
            tokenUrls[tokenId] = nftUrl;   // Set the URL for the NFT
            emit NFTMinted(msg.sender, tokenId);
        }
    }

    function setBaseURI(string memory newBaseUrl) external onlyOwner {
        baseUrl = newBaseUrl;
    }

    function updatePromptDescription(string memory newDescription) external onlyOwner {
        promptDescription = newDescription;
    }

    function setTokenAttributes(uint256 tokenId, string memory attributes) external onlyOwner {
        require(_exists(tokenId), "Invalid tokenId");
        tokenAttributes[tokenId] = attributes;
    }

    function getTokenAttributes(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId), "Invalid tokenId");
        return tokenAttributes[tokenId];
    }

    function getTokenUrl(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId), "Invalid tokenId");
        return tokenUrls[tokenId];
    }

    function totalSupply() public view override returns (uint256) {
        return totalMinted;
    }

    function tokensMintedByAddress(address account) external view returns (uint256) {
        return tokensMinted[account];
    }

    function _baseURI() internal view override returns (string memory) {
        return baseUrl;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Contract balance is zero");
        payable(owner()).transfer(balance);
    }
}
