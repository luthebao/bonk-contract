require('dotenv').config();
import "@nomiclabs/hardhat-waffle";
import "solidity-coverage";
import "@nomicfoundation/hardhat-verify";

export default {
    defaultNetwork: "baseGoerli",
    networks: {
        goerli: {
            url: "https://rpc.ankr.com/eth_goerli",
            accounts: [
                `${process.env.PRIVATE_KEY}`
            ],
        },
        baseGoerli: {
            url: "https://goerli.base.org",
            accounts: [
                `${process.env.PRIVATE_KEY}`
            ],
        },
        arbitrum: {
            url: "https://arb1.arbitrum.io/rpc",
            accounts: [
                `${process.env.PRIVATE_KEY}`
            ],
        },
    },
    etherscan: {
        apiKey: {
            goerli: `${process.env.API_KEY_GOERLI}`,
            baseGoerli: `${process.env.API_KEY_GOERLI}`,
            lineaGoerli: `${process.env.API_KEY_LINEAGOERLI}`,
            zkEVMtestnet: `${process.env.API_KEY_ZKEVM_TESTNET}`,
            opGoerli: `${process.env.API_KEY_OPGOERLI}`,
            arbitrum: `${process.env.API_KEY_ARBITRUM}`,
        },
        customChains: [
            {
                network: "baseGoerli",
                chainId: 84531,
                urls: {
                    apiURL: "https://api-goerli.basescan.org/api",
                    browserURL: "https://goerli.basescan.org/"
                },
            },
            {
                network: "lineaGoerli",
                chainId: 59140,
                urls: {
                    apiURL: "https://api-testnet.lineascan.build/api",
                    browserURL: "https://goerli.lineascan.build/"
                },
            },
            {
                network: "zkEVMtestnet",
                chainId: 1442,
                urls: {
                    apiURL: "https://api-testnet-zkevm.polygonscan.com/api",
                    browserURL: "https://testnet-zkevm.polygonscan.com/"
                },
            },
            {
                network: "opGoerli",
                chainId: 420,
                urls: {
                    apiURL: "https://api-goerli-optimistic.etherscan.io/api",
                    browserURL: "https://goerli-optimism.etherscan.io/"
                },
            },
            {
                network: "arbitrum",
                chainId: 42161,
                urls: {
                    apiURL: "https://api.arbiscan.io/api",
                    browserURL: "https://arbiscan.io/"
                },
            },
        ]
    },
    solidity: {
        compilers: [
            {
                version: "0.8.20",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200
                    }
                }
            },
        ]
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
};
