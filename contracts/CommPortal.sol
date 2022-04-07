// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract CommPortal{
    uint256 totalWaves; //uint=256-bit unsigned integer
    constructor(){
        console.log("This is a smart contract");
    }

    function wave() public{
        totalWaves+=1;
        console.log("%s has waved",msg.sender); //sender maps the wallet address
    }

    function getTotalWaves() public view returns (uint256){
        console.log("We have %d total waves!",totalWaves);
        return totalWaves;
    }
}