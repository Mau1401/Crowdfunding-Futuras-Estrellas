const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const crowdfundingModule = buildModule("crowdfundingModule", (m) => {
    // Implementar contratos con argumentos si es necesario
    const token = m.contract("Token");
    const myToken = m.contract("MyToken", ["0xd50a186C4F1bA41EB47cFC2C7c2324a380F4DDAB"]); // Dirección como propietario inicial
    const crowdfunding = m.contract("Crowdfunding", [token, myToken]);

    return { token, myToken, crowdfunding };
});

module.exports = crowdfundingModule;