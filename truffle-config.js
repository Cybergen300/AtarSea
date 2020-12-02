const HDWalletProvider = require('@truffle/hdwallet-provider')
mnemonic = "YOUR MNEMONIC"

module.exports = {

  networks: {

    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },

    live: {
      provider: () => {
          return new HDWalletProvider(mnemonic, "YOUR INFURA KEY")// Url to an Ethereum Node
      },

      gas: 5000000,
      gasPrice: 25000000000,
      network_id: '42'
    }

  },
  contracts_directory: './src/contracts/', 
  contracts_build_directory: './src/abis/',

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.6.6"},
    }
  }



