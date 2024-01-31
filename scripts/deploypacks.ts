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

    const ROUTER_UNISWAP_V2: `0x${string}` = "0xc259d1d3476558630d83b0b60c105ae958382792"

    const MyToken: { address: `0x${string}` } = {
        "address": "0xd31be249db60b30d047aae51ccc18d0561b75465"
    }
    const ADDRESSES = {
        "StorageNFT": "0xe0679bd58a12b33B6283575BA5c222C61fb6Ef47",
        "CARDNFT": "0x5346b27eB6B68fd850801da453E9Ba98b81f61a9",
        "PermanentNFT": "0xF4b855C3BF1eC9AE9a348eF5E05ae77634A6AEF8",
        "ConsumableNFT": "0xd8bF6CDDa376933fF006748273d9589e8F045409",
        "Packs": "",
    }

    const StorageNFT = await ethers.getContractFactory("Storage")

    const CARDNFT = await ethers.getContractFactory("CARDNFT")

    const PermanentNFT = await ethers.getContractFactory("PermanentNFT")

    const ConsumableNFT = await ethers.getContractFactory("ConsumableNFT")

    const Packs = await deployer.deployContract("Packs", [ADDRESSES.CARDNFT, ADDRESSES.PermanentNFT, ADDRESSES.ConsumableNFT, ADDRESSES.StorageNFT])
    await deployer.verifyContract(Packs.address, [ADDRESSES.CARDNFT, ADDRESSES.PermanentNFT, ADDRESSES.ConsumableNFT, ADDRESSES.StorageNFT])

    console.log("//", hre.network.name)
    console.log("// Packs:", Packs.address)

    console.info("grant Minter Role")
    // 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6 minter role
    await (await CARDNFT.attach(ADDRESSES.CARDNFT).grantRole("0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6", Packs.address)).wait(confirmnum)
    await (await PermanentNFT.attach(ADDRESSES.PermanentNFT).grantRole("0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6", Packs.address)).wait(confirmnum)
    await (await ConsumableNFT.attach(ADDRESSES.ConsumableNFT).grantRole("0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6", Packs.address)).wait(confirmnum)

    console.info("grant Mod Role")
    // 0x71f3d55856e4058ed06ee057d79ada615f65cdf5f9ee88181b914225088f834f mod role
    await (await StorageNFT.attach(ADDRESSES.StorageNFT).grantRole("0x71f3d55856e4058ed06ee057d79ada615f65cdf5f9ee88181b914225088f834f", Packs.address)).wait(confirmnum)


    console.info("set Price")
    // set Price Info 
    // Params: Id Pack, ETH Amount, Token Address
    await (await Packs.attach(Packs.address).setPriceInfo(1, "1500000000000000", MyToken.address)).wait(confirmnum)
    await (await Packs.attach(Packs.address).setPriceInfo(2, "2500000000000000", MyToken.address)).wait(confirmnum)
    await (await Packs.attach(Packs.address).setPriceInfo(3, "5000000000000000", MyToken.address)).wait(confirmnum)
    await (await Packs.attach(Packs.address).setPriceInfo(4, "7500000000000000", MyToken.address)).wait(confirmnum)

    console.info("set Uniswap Router")
    // set Uniswap Router
    // Put the Router V2 address of Uniswap / pancakeswap / etc ...
    await (await Packs.attach(Packs.address).setUniswapRouter(ROUTER_UNISWAP_V2)).wait(confirmnum)


    for (let index = 1; index < 5; index++) {
        console.info("TEST BUY", index)
        await (await Packs.attach(Packs.address).buyPackTest(index)).wait(confirmnum)
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


// baseGoerli
// MyToken: 0xd31be249db60b30d047aae51ccc18d0561b75465
// StorageNFT: 0xe0679bd58a12b33B6283575BA5c222C61fb6Ef47
// CARDNFT: 0x5346b27eB6B68fd850801da453E9Ba98b81f61a9
// PermanentNFT: 0xF4b855C3BF1eC9AE9a348eF5E05ae77634A6AEF8
// ConsumableNFT: 0xd8bF6CDDa376933fF006748273d9589e8F045409
// Packs: 0xedCDFe25b5793b0864be8BE123A5543820734139