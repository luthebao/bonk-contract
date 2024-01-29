import { Deployer } from "./helper";
import hre, { ethers } from "hardhat";

async function main() {
    const accounts = await hre.ethers.getSigners();
    const account_num = 0
    const confirmnum = 2

    const account = accounts[account_num];
    const network = hre.network.name
    console.log(`Submit transactions with account: ${account.address} on ${network}`)

    const deployer = new Deployer(account_num, 3)

    const prompt = require('prompt-sync')();
    const iscontinue = prompt("continue (y/n/_): ")
    if (iscontinue !== "y") {
        console.log("end")
        return
    }

    const MyToken = {
        "address": "your token address"
    }
    // const MyToken = await deployer.deployContract("MyToken", [])
    // await deployer.verifyContract(MyToken.address, [])

    const StorageNFT = await deployer.deployContract("Storage", [])
    await deployer.verifyContract(StorageNFT.address, [])

    const CARDNFT = await deployer.deployContract("CARDNFT", [StorageNFT.address])
    await deployer.verifyContract(CARDNFT.address, [StorageNFT.address])

    const PermanentNFT = await deployer.deployContract("PermanentNFT", [StorageNFT.address])
    await deployer.verifyContract(PermanentNFT.address, [StorageNFT.address])

    const ConsumableNFT = await deployer.deployContract("ConsumableNFT", [])
    await deployer.verifyContract(ConsumableNFT.address, [])

    const Packs = await deployer.deployContract("Packs", [CARDNFT.address, PermanentNFT.address, ConsumableNFT.address, StorageNFT.address])
    await deployer.verifyContract(Packs.address, [CARDNFT.address, PermanentNFT.address, ConsumableNFT.address, StorageNFT.address])

    console.log("//", hre.network.name)
    console.log("// MyToken:", MyToken.address)
    console.log("// StorageNFT:", StorageNFT.address)
    console.log("// CARDNFT:", CARDNFT.address)
    console.log("// PermanentNFT:", PermanentNFT.address)
    console.log("// ConsumableNFT:", ConsumableNFT.address)
    console.log("// Packs:", Packs.address)

    // 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6 minter role
    // 0x71f3d55856e4058ed06ee057d79ada615f65cdf5f9ee88181b914225088f834f mod role
    await (await CARDNFT.attach(CARDNFT.address).grantRole("0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6", Packs.address)).wait(confirmnum)
    await (await PermanentNFT.attach(PermanentNFT.address).grantRole("0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6", Packs.address)).wait(confirmnum)
    await (await ConsumableNFT.attach(ConsumableNFT.address).grantRole("0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6", Packs.address)).wait(confirmnum)
    await (await StorageNFT.attach(StorageNFT.address).grantRole("0x71f3d55856e4058ed06ee057d79ada615f65cdf5f9ee88181b914225088f834f", Packs.address)).wait(confirmnum)

    // set Price Info 
    // Params: Id Pack, ETH Amount, Token Address
    await (await Packs.attach(Packs.address).setPriceInfo(1, "150000000000000000", MyToken.address)).wait(confirmnum)
    await (await Packs.attach(Packs.address).setPriceInfo(2, "250000000000000000", MyToken.address)).wait(confirmnum)
    await (await Packs.attach(Packs.address).setPriceInfo(3, "500000000000000000", MyToken.address)).wait(confirmnum)
    await (await Packs.attach(Packs.address).setPriceInfo(4, "750000000000000000", MyToken.address)).wait(confirmnum)

    // set Uniswap Router
    // Put the Router V2 address of Uniswap / pancakeswap / etc ...
    await (await Packs.attach(Packs.address).setUniswapRouter("0xC259d1D3476558630d83b0b60c105ae958382792")).wait(confirmnum)


    
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

// baseGoerli
// StorageNFT: 0x82E5dF4403fE820E0a4bc219b03aD46480B01680
// CARDNFT: 0x9EE41F58EB3155864731f90CDD0823D54f28e281
// PermanentNFT: 0xa98352b10dBF7185dd2B79a8Cb8AEE129bAeE9a6
// ConsumableNFT: 0x8908630B89c30A3f631a1b5E8FFE7959F62685F4
// Packs: 0x55132357272FEa2cEC2F7034D138C10B399E0E39
