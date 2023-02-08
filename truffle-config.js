const HDWalletProvider = require('@truffle/hdwallet-provider');

require('@next/env').loadEnvConfig('./');

module.exports = {
  contracts_build_directory: './public/contracts',

  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*'
    },
    goerli: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: process.env.NEXT_PUBLIC_MNEMONIC
          },
          providerOrUrl: `https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
          addressIndex: 0
        }),
      network_id: 5
    }
  },

  compilers: {
    solc: {
      version: '0.8.17'
    }
  }
};
