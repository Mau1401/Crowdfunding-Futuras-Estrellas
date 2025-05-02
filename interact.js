const hre = require("hardhat");

async function main() {
  try {
    // Obtener el contrato Token
    const Token = await hre.ethers.getContractFactory("Tokenv2");
    const tokenAddress = "0x063643C1fC3731A27a2aF1E2D1cD6Dc81CCEc658"; // Reemplazar con la dirección real del contrato desplegado
    const token = Token.attach(tokenAddress);

    // Obtener el contrato Crowdfunding
    const Crowdfunding = await hre.ethers.getContractFactory("Crowdfundingv2");
    const crowdfundingAddress = "0xcCCBc25DB409978cB940249c0400b95E8ae2Ec2b"; // Reemplazar con la dirección real
    const crowdfunding = Crowdfunding.attach(crowdfundingAddress);

    // Obtener el contrato MyToken
    const MyToken = await hre.ethers.getContractFactory("MyTokenv2");
    const nftAddress = "0x8d8FF7d3A0461BF6f0d2c8FB81D8936F5d6eFA70"; // Reemplazar con la dirección real de MyToken
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
    const register1Tx = await crowdfunding.registerInvestor(investor1Address, 1, 50);
    await register1Tx.wait(1); // Esperar la confirmación
    console.log("Inversor tipo 1 registrado!");

    // Obtener información del inversor tipo 1
    const investor1Data = await crowdfunding.investors(investor1Address);
    console.log("Datos del inversor tipo 1:", {
      tokens: investor1Data.tokens.toString(),
      investorType: investor1Data.investorType,
    });

    // Ejemplo 3: Registro de inversor tipo 2 (con NFT)
    // Mint del NFT (tipo 2) para el inversor
    console.log("Minteando NFT para el inversor tipo 2...");
    const investor2Address = "0x6958256E56b023F0e1A79154C6E63c1b95DDA716";
    const nftURI = "ipfs://QmQXB4QYpMiKs9ZEyHFtbqJ3CxkKwkWRD3Nu6BTm1AY4vL"; // URI del NFT

    // Minteo el NFT para el inversor
    const mintTx = await nftContract.safeMint(investor2Address, nftURI);
    await mintTx.wait(1); // Esperar la confirmación
    console.log("NFT minteado!");

    // Registro del inversor tipo 2 con 25 tokens
    console.log("Registrando inversor tipo 2 con 25 tokens...");
    const registerTx = await crowdfunding.registerInvestor(investor2Address, 2, 25);
    await registerTx.wait(1); // Esperar la confirmación
    console.log("Inversor tipo 2 registrado con 25 tokens y NFT!");

    // Obtener información del inversor tipo 2
    const investor2Data = await crowdfunding.investors(investor2Address);
    console.log("Datos del inversor tipo 2:", {
      tokens: investor2Data.tokens.toString(),
      investorType: investor2Data.investorType,
    });

  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

main();