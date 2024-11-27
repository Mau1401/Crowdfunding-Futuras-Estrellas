const { ethers } = require("hardhat");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545"); // RPC local
  const signer = provider.getSigner(); // Cuentas predeterminadas

  // Direcciones de los contratos (actualiza con los valores reales tras despliegue)
  const tokenAddress = "TOKEN_CONTRACT_ADDRESS";
  const myTokenAddress = "MYTOKEN_CONTRACT_ADDRESS";
  const crowdfundingAddress = "CROWDFUNDING_CONTRACT_ADDRESS";

  // Abstrae los contratos desplegados
  const Token = await ethers.getContractFactory("Token");
  const token = Token.attach(tokenAddress);

  const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
  const crowdfunding = Crowdfunding.attach(crowdfundingAddress);

  // Ejemplo 1: Transferencia de 1000 tokens al contrato de crowdfunding
  console.log("Transfering 1000 tokens to Crowdfunding contract...");
  const transferTx = await token.transfer(crowdfundingAddress, 1000);
  await transferTx.wait();
  console.log("Tokens transferred!");

  // Ejemplo 2: Registro de inversor tipo 1
  console.log("Registering investor type 1...");
  const investor1Address = "0x17F6AD8Ef982297579C203069C1DbfFE4348c372";
  const register1Tx = await crowdfunding.registerInvestor(investor1Address, 1, 50, "");
  await register1Tx.wait();
  console.log("Investor 1 registered!");

  // Ejemplo 3: Registro de inversor tipo 2
  console.log("Registering investor type 2...");
  const investor2Address = "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678";
  const nftURI = "ipfs://Qmdyvbt3ge2vpsfaULdoJ5C8rmnnXYbQGg5ft8uYiT1Wsi";
  const register2Tx = await crowdfunding.registerInvestor(investor2Address, 2, 25, nftURI);
  await register2Tx.wait();
  console.log("Investor 2 registered with NFT!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});