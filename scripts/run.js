// const { hexStripZeros } = require("ethers/lib/utils")

const main = async() => {

    // I grabbed the wallet address of contract owner and I also grabbed a random wallet address and called it randomPerson.
    const [owner, randomPerson] = await hre.ethers.getSigners();
    //Compile contract under the artifacts directory
    const commContractFactory = await hre.ethers.getContractFactory("CommPortal");
    const commContract = await commContractFactory.deploy();

    //Hardhat will create a local Ethereum network for us, but just for this contract. Then, after the script completes it'll destroy that local network. So, every time you run the contract, it'll be a fresh blockchain. What's the point? It's kinda like refreshing your local server every time so you always start from a clean slate which makes it easy to debug errors.
    await commContract.deployed();

    //We'll wait until our contract is officially deployed to our local blockchain! Our constructor runs when we actually deploy.
    console.log("Contract deployed to:", commContract.address);
    // see the address of the person deploying our contract
    console.log("Contract deployed by:", owner.address);

    let waveCount;
    waveCount = await commContract.getTotalWaves();

    let waveTxn = await commContract.wave();
    await waveTxn.wait();

    waveCount = await commContract.getTotalWaves();

    waveTxn = await commContract.connect(randomPerson).wave();
    await waveTxn.wait();

    waveCount = await commContract.getTotalWaves();
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