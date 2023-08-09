import web3 from 'web3'
import getExchangeRate from '../services/getExchangeRate'

export const weiToEth = (wei) => {
    return web3.utils.fromWei(wei, 'ether')
}

export const ethToWei = (eth) => {
    const stringEth = eth.toString()
    return web3.utils.toWei(stringEth, 'ether')
}

export const ethToUsd = (eth) => {
    return ethToUsd(eth)
}

export const UsdToEth = async (usd) => {
    const exchangeRage = await getExchangeRate()
    return usd / exchangeRage
}
