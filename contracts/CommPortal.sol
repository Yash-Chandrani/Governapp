// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract CommPortal{
    uint256 totalWaves; //uint=256-bit unsigned integer
     /*
     * We will be using this below to help generate a random number
     */
    uint256 private seed;
    event NewWave(address indexed from, uint256 timestamp, string message);
    
    struct Wave {
        address waver; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }
    /*
     * a variable waves that lets me store an array of structs.
     * This is what lets me hold all the waves anyone ever sends to me!
    */
    Wave[] waves;
    
    mapping(address => uint256) public lastWavedAt;
    /*
     * This is an address => uint mapping, meaning I can associate an address with a number!
     * In this case, I'll be storing the address with the last time the user waved at us.
     */
    constructor() payable{
        console.log("This is a smart contract");
        /*
         * Set the initial seed
         */
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public{ //This is the message our user sends us from the frontend!
        /*
         * We need to make sure the current timestamp is at least 15-minutes bigger than the last timestamp we stored
         */
        require(
            lastWavedAt[msg.sender] + 30 seconds < block.timestamp,
            "Wait 30s"
        );

        /*
         * Update the current timestamp we have for the user
         */
        lastWavedAt[msg.sender] = block.timestamp;


        totalWaves+=1;
        console.log("%s has waved",msg.sender); //sender maps the wallet address
         /*
         * store the wave data in the array.
         */
        waves.push(Wave(msg.sender, _message, block.timestamp));
        

           /*
         * Generate a new seed for the next user that sends a wave
         */
        seed = (block.difficulty + block.timestamp + seed) % 100;

        console.log("Random # generated: %d", seed);

        /*
         * Give a 50% chance that the user wins the prize.
         */
        if (seed <= 50) {
            console.log("%s won!", msg.sender);


         uint256 prizeAmount = 0.00001 ether;
        /*require which basically checks to see that some condition is true. 
        If it's not true, it will quit the function and cancel the transaction.*/
        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}(""); //to send money
        require(success, "Failed to withdraw money from contract.");
        emit NewWave(msg.sender, block.timestamp, _message);
    }

     /*
     * getAllWaves will return the struct array, waves, to us.
     * This will make it easy to retrieve the waves from our website!
     */
    }
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256){
        console.log("We have %d total waves!",totalWaves);
        return totalWaves;
    }
}