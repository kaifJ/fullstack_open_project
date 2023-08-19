import web3 from 'web3'
import getExchangeRate from '../services/getExchangeRate'

export const weiToEth = (wei) => {
    return web3.utils.fromWei(wei, 'ether')
}

export const ethToWei = (eth) => {
    const stringEth = eth.toString()
    return web3.utils.toWei(stringEth, 'ether')
}

export const ethToUsd = async (eth) => {
    const exchangeRage = await getExchangeRate()
    return eth * exchangeRage
}

export const usdToEth = async (usd) => {
    const exchangeRage = await getExchangeRate()
    return (usd / exchangeRage).toFixed(18).toString()
}
