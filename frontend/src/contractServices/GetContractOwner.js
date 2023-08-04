import { abi, contractAddresses } from '../constants'
import { useMoralis, useWeb3Contract } from 'react-moralis'

const GetContractOwner = () => {
    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const propertyAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const { runContractFunction: getContractOwner } = useWeb3Contract({
        abi: abi,
        contractAddress: propertyAddress,
        functionName: 'getContractOwner',
        params: {}
    })

    return getContractOwner
}

export default GetContractOwner
