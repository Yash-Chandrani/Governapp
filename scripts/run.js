// const { hexStripZeros } = require("ethers/lib/utils")

const main = async() => {

    // I grabbed the wallet address of contract owner and I also grabbed a random wallet address and called it randomPerson.

    //Compile contract under the artifacts directory
    const commContractFactory = await hre.ethers.getContractFactory("CommPortal");
    const commContract = await commContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"), //funding the contract
    });

    //Hardhat will create a local Ethereum network for us, but just for this contract. Then, after the script completes it'll destroy that local network. So, every time you run the contract, it'll be a fresh blockchain. What's the point? It's kinda like refreshing your local server every time so you always start from a clean slate which makes it easy to debug errors.
    await commContract.deployed();

    //We'll wait until our contract is officially deployed to our local blockchain! Our constructor runs when we actually deploy.
    console.log("Contract deployed to:", commContract.address);
    // see the address of the person deploying our contract
    // console.log("Contract deployed by:", owner.address);

    /*
     * Get Contract balance
     */
    let contractBalance = await hre.ethers.provider.getBalance(
        commContract.address
    );
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    //two waves

    const waveTxn = await commContract.wave("This is wave #1");
    await waveTxn.wait();

    const waveTxn2 = await commContract.wave("This is wave #2");
    await waveTxn2.wait();

    // let waveCount;
    // waveCount = await commContract.getTotalWaves();
    // console.log(waveCount.toNumber());

    /**
     * Let's send a few waves!
     */

    // let waveTxn = await commContract.wave("A message");
    // await waveTxn.wait(); // Wait for the transaction to be mined

    /*
     * Get Contract balance to see what happened!
     */
    contractBalance = await hre.ethers.provider.getBalance(commContract.address);
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    // const [_, randomPerson] = await hre.ethers.getSigners();
    // waveTxn = await commContract.connect(randomPerson).wave("Another message");
    // await waveTxn.wait(); // Wait for the transaction to be mined

    let allWaves = await commContract.getAllWaves();
    console.log(allWaves);
    // waveCount = await commContract.getTotalWaves();
};

const runMain = async() => {
    try {
        await main();
        process.exit(0); //exit Node process without error
    } catch (error) {
        console.log(error);
        process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
};

runMain();