// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.15;

import "./Tokenv2.sol";

contract Crowdfundingv2 {
    Tokenv2 public token; // Referencia al contrato del token.

    struct Investor {
        uint256 tokens;
        uint8 investorType; // Almacena el tipo de inversor (1 o 2)
    }

    mapping(address => Investor) public investors;

    event InvestorRegistered(address indexed investor, uint256 tokens, uint8 investorType);

    constructor(address tokenAddress) {
        token = Tokenv2(tokenAddress);
    }

    function registerInvestor(address _investor, uint8 _type, uint256 _investment) external {
        require(_type == 1 || _type == 2, "Invalid investor type");
        require(_investment > 0, "Investment must be greater than 0");

        uint256 tokensToIssue = _investment; // Cantidad de tokens que se transferirán.

        // Transferencia de tokens al inversor
        require(token.transfer(_investor, tokensToIssue), "Token transfer failed");

        // Actualizar o crear el registro del inversor
        if (investors[_investor].tokens > 0) {
            investors[_investor].tokens += tokensToIssue;
        } else {
            investors[_investor] = Investor(tokensToIssue, _type);
        }

        // Emitir el evento con el tipo de inversor
        emit InvestorRegistered(_investor, tokensToIssue, _type);
    }
}