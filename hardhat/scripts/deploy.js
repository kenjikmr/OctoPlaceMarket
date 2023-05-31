// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const feeAddress = '0xd278c19364378b09464d1bf340793d73a7AD4B2f';
  const OctoplaceMarket = await hre.ethers.getContractFactory("OctoplaceMarket");
  const octoMarket = await OctoplaceMarket.deploy(feeAddress, feeAddress);

  await octoMarket.deployed();

  console.log(octoMarket.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
