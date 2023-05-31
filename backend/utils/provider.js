const { ethers } = require("ethers");
const contractAbi = require("../abi/OctoplaceMarket.json");

function getContract() {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-rpc-api.thetatoken.org/rpc"
  );
  const contractAddress = "0x465a8f1a0bd542f1ea9ae10165e6eeb5ec51f4c3";
  return new ethers.Contract(contractAddress, contractAbi.abi, provider);
}

module.exports = {
  getContract,
};
