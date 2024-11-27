// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.15;

import "./Token.sol";
import "./MyToken.sol";

contract Crowdfunding {
    Token public token; // Referencia al contrato del token.
    MyToken public nftContract; // Referencia al contrato del NFT.

    struct Investor {
        uint256 tokens;
        bool hasNFT;
    }

    mapping(address => Investor) public investors;

    event InvestorRegistered(address indexed investor, uint256 tokens, bool nftIssued);

    constructor(address tokenAddress, address nftAddress) {
        token = Token(tokenAddress);
        nftContract = MyToken(nftAddress);
    }

    function registerInvestor(address _investor, uint8 _type, uint256 _investment, string memory _uri) external {
        require(_type == 1 || _type == 2, "Invalid investor type");
        require(_investment > 0, "Investment must be greater than 0");

        uint256 tokensToIssue = _investment; // Cantidad de tokens que se transferirán.
        bool nftIssued = false;

        if (_type == 2) {
            // Mint del NFT y asignación del URI
            nftContract.safeMint(_investor, _uri);
            nftIssued = true;
        }

        // Transferencia de tokens al inversor
        require(token.transfer(_investor, tokensToIssue), "Token transfer failed");

        // Actualizar o crear el registro del inversor
        if (investors[_investor].tokens > 0) {
            investors[_investor].tokens += tokensToIssue;
            if (nftIssued) {
                investors[_investor].hasNFT = true;
            }
        } else {
            investors[_investor] = Investor(tokensToIssue, nftIssued);
        }

        emit InvestorRegistered(_investor, tokensToIssue, nftIssued);
    }
}