import { abi, contractAddresses } from '../constants'
import { useMoralis, useWeb3Contract } from 'react-moralis'

const GetAllProperties = () => {
    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const propertyAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const { runContractFunction: getAllProperties } = useWeb3Contract({
        abi: abi,
        contractAddress: propertyAddress,
        functionName: 'getAllProperties',
        params: {}
    })

    return getAllProperties
}

export default GetAllProperties
