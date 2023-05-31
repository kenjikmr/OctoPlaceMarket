require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // solidity: "0.8.18",
  solidity: {
    compilers:[
      {
      version: "0.8.18"
    },
    {
      version:"0.6.2"
    }],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks:{
    theta :{
      url:'https://eth-rpc-api-testnet.thetatoken.org/rpc',
      accounts:['6ee71775355c8062942c96a393ea3d74f2b6ec1935cca764a43b3747d57c6abf']
    }
  }
};
