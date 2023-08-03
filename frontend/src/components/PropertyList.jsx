import { contractAddresses, abi } from '../constants'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import PropertyDetails from './PropertyDetails'

export default function LotteryEntrance() {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const propertyAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const [properties, setProperties] = useState([])

    const {
        runContractFunction: getAllProperties,
        data: enterTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: propertyAddress,
        functionName: 'getAllProperties',
        msgValue: '0',
        params: {},
    })

    async function updateUIValues() {
        const properties = await getAllProperties()
        setProperties(properties)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])

    return isLoading || isFetching ? (
        <div>Loading...</div>
    ) : (
        <div>
            {properties.map((property) => (
                <PropertyDetails
                    key={`${property.propertyId.toString()}~${property.price.toString()}`}
                    property={property}
                />
            ))}
        </div>
    )
}
