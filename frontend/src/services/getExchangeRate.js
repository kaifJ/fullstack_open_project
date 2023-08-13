import axios from 'axios'
const getExchangeRate = async () => {
    const response = await axios.get(
        'https://api.etherscan.io/api?module=stats&action=ethprice&apikey=4N91AZPNPK3EPE4CC7YB3KMYI4H9AQTZRU'
    )
    return response.data.result.ethusd
}

export default getExchangeRate
