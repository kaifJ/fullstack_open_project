const { ethers } = require("hardhat");

const PROPERTY_PRICES = [ethers.BigNumber.from("2000000000000000000"), ethers.BigNumber.from("3000000000000000000")]

const addProperty = async (contract) => {
    await contract.addProperty(PROPERTY_PRICES[0]);
}

const requestOwnershipTransfer = async (contract) => {
    await addProperty(contract);
    const accounts = await ethers.getSigners();
    const owner2 = contract.connect(accounts[1]);
    const taxReceip = await owner2.requestOwnershipTransfer(1, { value: `${PROPERTY_PRICES[0]}` });
    return taxReceip
}

module.exports = {
    PROPERTY_PRICES,
    addProperty,
    requestOwnershipTransfer
}