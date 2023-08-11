import { ethers } from "hardhat";

async function main() {
  const ModelMarketplace = await ethers.getContractFactory("ModelMarketplace");
  const modelMarketplace = await ModelMarketplace.deploy();
  await modelMarketplace.waitForDeployment();

  console.log(`Marketplace deployed to: ${modelMarketplace.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
