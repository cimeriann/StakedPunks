const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
const { WHITELIST_CONTRACT_ADDRESS, METADATA_URL } = require("../constants");

async function main() {
  const whitelistContract = WHITELIST_CONTRACT_ADDRESS;
  const metadataURL = METADATA_URL;

  const stakedPunksContract = await ethers.getContractFactory("StakedPunks");

  const deployedStakedPunksContract = await stakedPunksContract.deploy(
    metadataURL,
    whitelistContract
  );

  await deployedStakedPunksContract.deployed();

  console.log(
    "StakedPunks contract address at: ",
    deployedStakedPunksContract.address
  );
}
main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
