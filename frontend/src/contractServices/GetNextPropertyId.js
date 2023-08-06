import { abi, contractAddresses } from '../constants'
import { useMoralis, useWeb3Contract } from 'react-moralis'

const GetNextPropertyId = () => {
    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const propertyAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const { runContractFunction: getNextPropertyId } = useWeb3Contract({
        abi: abi,
        contractAddress: propertyAddress,
        functionName: 'getNextPropertyId',
        params: {}
    })

    return getNextPropertyId
}

export default GetNextPropertyId
