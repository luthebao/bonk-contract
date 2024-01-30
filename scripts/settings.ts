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

    const ROUTER_UNISWAP_V2: `0x${string}` = "router of pancake swap"

    const MyToken: { address: `0x${string}` } = {
        "address": "your token address"
    }
    const ADDRESSES = {
        "StorageNFT": "",
        "CARDNFT": "",
        "PermanentNFT": "",
        "ConsumableNFT": "",
        "Packs": "",
    }

    const StorageNFT = await ethers.getContractFactory("Storage")

    const CARDNFT = await ethers.getContractFactory("CARDNFT")

    const PermanentNFT = await ethers.getContractFactory("PermanentNFT")

    const ConsumableNFT = await ethers.getContractFactory("ConsumableNFT")

    const Packs = await ethers.getContractFactory("Packs")

    // 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6 minter role
    // 0x71f3d55856e4058ed06ee057d79ada615f65cdf5f9ee88181b914225088f834f mod role
    await (await CARDNFT.attach(ADDRESSES.CARDNFT).grantRole("0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6", ADDRESSES.Packs)).wait(confirmnum)
    await (await PermanentNFT.attach(ADDRESSES.PermanentNFT).grantRole("0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6", ADDRESSES.Packs)).wait(confirmnum)
    await (await ConsumableNFT.attach(ADDRESSES.ConsumableNFT).grantRole("0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6", ADDRESSES.Packs)).wait(confirmnum)
    await (await StorageNFT.attach(ADDRESSES.StorageNFT).grantRole("0x71f3d55856e4058ed06ee057d79ada615f65cdf5f9ee88181b914225088f834f", ADDRESSES.Packs)).wait(confirmnum)

    // set Price Info 
    // Params: Id Pack, ETH Amount, Token Address
    await (await Packs.attach(ADDRESSES.Packs).setPriceInfo(1, "150000000000000000", MyToken.address)).wait(confirmnum)
    await (await Packs.attach(ADDRESSES.Packs).setPriceInfo(2, "250000000000000000", MyToken.address)).wait(confirmnum)
    await (await Packs.attach(ADDRESSES.Packs).setPriceInfo(3, "500000000000000000", MyToken.address)).wait(confirmnum)
    await (await Packs.attach(ADDRESSES.Packs).setPriceInfo(4, "750000000000000000", MyToken.address)).wait(confirmnum)

    // set Uniswap Router
    // Put the Router V2 address of Uniswap / pancakeswap / etc ...
    await (await Packs.attach(ADDRESSES.Packs).setUniswapRouter(ROUTER_UNISWAP_V2)).wait(confirmnum)



}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });