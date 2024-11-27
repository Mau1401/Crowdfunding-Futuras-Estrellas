const hre = require("hardhat");

async function main() {
  // Despliega el contrato Token
  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();
  console.log("Token deployed to:", token.address);

  // Despliega el contrato MyToken
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy(await hre.ethers.provider.getSigner().getAddress());
  await myToken.deployed();
  console.log("MyToken deployed to:", myToken.address);

  // Despliega el contrato Crowdfunding
  const Crowdfunding = await hre.ethers.getContractFactory("Crowdfunding");
  const crowdfunding = await Crowdfunding.deploy(token.address, myToken.address);
  await crowdfunding.deployed();
  console.log("Crowdfunding deployed to:", crowdfunding.address);

  // Retorna las direcciones para usarlas en interact.js
  return {
    tokenAddress: token.address,
    myTokenAddress: myToken.address,
    crowdfundingAddress: crowdfunding.address,
  };
}

// Manejo de errores
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});