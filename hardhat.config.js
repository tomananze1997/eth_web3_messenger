require('@nomiclabs/hardhat-ethers');
require('@next/env').loadEnvConfig('./');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.17',
  defaultNetwork: 'hardhat',
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
      accounts: [`0x${process.env.NEXT_PUBLIC_PRIVATE_KEY}`],
      chainId: 5
    }
  }
};
