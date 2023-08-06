import axios from 'axios'

// eslint-disable-next-line no-undef
// const ethToUsdUrl = process.env.ETHER_SCAN_URL

const ethToUsd = async () => {
    // eslint-disable-next-line no-undef
    const response = await axios.get(
        'https://api.etherscan.io/api?module=stats&action=ethprice&apikey=4N91AZPNPK3EPE4CC7YB3KMYI4H9AQTZRU'
    )
    // eslint-disable-next-line no-debugger
    debugger
    return response.data.result.ethusd
}

export default ethToUsd
