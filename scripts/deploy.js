const main = async() => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log("Deploying contracts with the account :", deployer.address);
    console.log("Account balance: ", accountBalance.toString());

    const commContractFactory = await hre.ethers.getContractFactory("CommPortal");
    const commContract = await commContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.001"), //give 0.001 eth to contract on test net
    });
    await commContract.deployed();

    console.log("CommPortal address: ", commContract.address);
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