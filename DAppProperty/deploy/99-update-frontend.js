const { ethers } = require("hardhat")
const fs = require('fs')

const FRONTEND_PATH = '../frontend/src/constants/contractAddresses.json'
const ABI_PATH = '../frontend/src/constants/abi.json'

module.exports = async function () {
    if (process.env.UPDATE_FRONT_END) {
        console.log('Updating frontend ...')
        updateContractAddresses()
        updateAbi()
    }
}

async function updateAbi() {
    const property = await ethers.getContract('PropertyOwnership')
    fs.writeFileSync(ABI_PATH, property.interface.format(ethers.utils.FormatTypes.json))
}

async function updateContractAddresses() {
    const property = await ethers.getContract('PropertyOwnership')
    const currentAddresses = JSON.parse(fs.readFileSync(FRONTEND_PATH, 'utf8'))
    const chainId = network.config.chainId.toString()

    if (chainId in currentAddresses) {
        if (!currentAddresses[chainId].includes(property.address)) {
            currentAddresses[chainId].push(property.address)
        }
    } else {
        currentAddresses[chainId] = [property.address]
    }

    fs.writeFileSync(FRONTEND_PATH, JSON.stringify(currentAddresses))
}

module.exports.tags = ['all', 'frontend']
