
/* global ethers task */
require('@nomiclabs/hardhat-waffle')
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

const rpcs = require("./RPC.json")
//url: "https://rpc-mumbai.maticvigil.com",
//url: "https://matic-mumbai.chainstacklabs.com",
//url: "https://polygon-mumbai-bor.publicnode.com",



const { PRIVATE_KEY_TESTNET, ETHERSCAN_API_KEY } = process.env;

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.17',
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  gasReporter: {
    enabled: true
  },
  evmVersion: "london",
  defaultNetwork: "mumbai",
  networks: {
    mumbai: {
      url: rpcs.vigil,
      chainId: 80001,
      gasPrice: 35000000000,
      accounts: [`0x${PRIVATE_KEY_TESTNET}`]
    }
  }
  ,
    etherscan: {
        // Your API key for Etherscan
        apiKey: ETHERSCAN_API_KEY
    }
}
