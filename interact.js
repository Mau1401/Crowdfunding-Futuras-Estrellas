const hre = require("hardhat");

async function main() {
  try {
    // Obtener el contrato Token
    const Token = await hre.ethers.getContractFactory("Token");
    const tokenAddress = "0x95081354A0f731D876fE47C267B6ae78de262Cdb"; // Reemplazar con la dirección real del contrato desplegado
    const token = Token.attach(tokenAddress);

    // Obtener el contrato Crowdfunding
    const Crowdfunding = await hre.ethers.getContractFactory("Crowdfunding");
    const crowdfundingAddress = "0x0C60D2363ff35De27d9238d625285364f6f0f004"; // Reemplazar con la dirección real
    const crowdfunding = Crowdfunding.attach(crowdfundingAddress);

    // Obtener el contrato MyToken
    const MyToken = await hre.ethers.getContractFactory("MyToken");
    const nftAddress = "0x4308Cc1234a6b00f41912347987c76586F90Edda"; // Reemplazar con la dirección real de MyToken
    const nftContract = MyToken.attach(nftAddress);

    // Obtener la cuenta propietaria del contrato MyToken
    const [owner] = await hre.ethers.getSigners();
    console.log("Owner address:", owner.address);

    // Ejemplo 1: Transferencia de 1000 tokens
    console.log("Transfiriendo 1000 tokens al contrato de Crowdfunding...");
    const transferTx = await token.transfer(crowdfundingAddress, 1000);
    await transferTx.wait(1); // Esperar la confirmación
    console.log("Tokens transferidos!");

    // Ejemplo 2: Registro de inversor tipo 1
    console.log("Registrando inversor tipo 1...");
    const investor1Address = "0x7c17508D51eA18758833d308CEDFaEe99Eb6049C";
    const register1Tx = await crowdfunding.registerInvestor(investor1Address, 1, 50, "");
    await register1Tx.wait(1); // Esperar la confirmación
    console.log("Inversor tipo 1 registrado!");

    // Ejemplo 3: Registro de inversor tipo 2 (con NFT)
    console.log("Registrando inversor tipo 2...");
    const investor2Address = "0xd50a186C4F1bA41EB47cFC2C7c2324a380F4DDAB";
    const nftURI = "ipfs://QmTER2b6LSA828fDBXuBFUABe1R8jjhgg2rSD4M6AWhvv6";

    // Ejecutar la transacción desde la cuenta propietaria de MyToken
    const register2Tx = await crowdfunding.registerInvestor(investor2Address, 2, 25, nftURI, {
      from: owner.address, // Ejecutar desde la cuenta propietaria
    });
    await register2Tx.wait(1);
    console.log("Inversor tipo 2 registrado con NFT!");
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

main();