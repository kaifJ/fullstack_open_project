import { useEffect, useState, useContext } from 'react'
import { useMoralis } from 'react-moralis'
import web3 from 'web3'
import { StateContext, DispatchContext } from './Dashboard'
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material'
import { ZERO_ADDRESS } from '../utils/Constants'
import Notification from './Notificaiton'
import {
    RequestTransfer,
    GetContractOwner,
    GetPendingRequest,
    GetPropertyOwner,
    CancelTransferRequest,
    ApproveTransferRequest,
} from '../contractServices/index.js'
import propertyServices from '../services/property'
import ethToUsd from '../services/ethToUsd'

const PropertyDetails = ({ property }) => {
    const { isWeb3Enabled, account } = useMoralis()
    const [ownerAddress, setOwnerAddress] = useState('')
    const [pendingRequest, setPendingRequest] = useState(false)
    const [propertyOwner, setPropertyOwner] = useState('')
    const { handleSuccess, handleFailure } = Notification()
    const [propertyDetails, setPropertyDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [ethPrice, setEthPrice] = useState(0)

    const getContractOwner = GetContractOwner()
    const getPropertyOwner = GetPropertyOwner(property.propertyId)
    const getPendingRequest = GetPendingRequest(property.propertyId)
    const approveTransferRequest = ApproveTransferRequest(
        property.propertyId,
        pendingRequest?.requester
    )
    const cancelTransferRequest = CancelTransferRequest(property.propertyId)
    const requestTransfer = RequestTransfer(
        property.propertyId.toString(),
        property.price.toString()
    )

    const state = useContext(StateContext)
    const dispatch = useContext(DispatchContext)

    useEffect(() => {
        propertyServices
            .getPropertyById(property.propertyId.toString())
            .then((_propertyDetails) => {
                setPropertyDetails(_propertyDetails)
                setLoading(false)
            })

        ethToUsd().then((price) => {
            setEthPrice(price)
        })

        if (isWeb3Enabled) {
            getContractOwner().then((ownerAddress) => {
                setOwnerAddress(ownerAddress.toLowerCase())
            })
            getPendingRequest().then((pendingRequest) => {
                const zeroAddress = ZERO_ADDRESS.toLowerCase()
                if (pendingRequest.requester.toLowerCase() === zeroAddress)
                    setPendingRequest(false)
                else setPendingRequest(pendingRequest)
            })
            getPropertyOwner().then((propertyOwner) => {
                setPropertyOwner(propertyOwner.toLowerCase())
            })
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        if (state?.dispatched) {
            getPendingRequest().then((pendingRequest) => {
                const zeroAddress = ZERO_ADDRESS.toLowerCase()
                if (pendingRequest.requester.toLowerCase() === zeroAddress)
                    setPendingRequest(false)
                else setPendingRequest(pendingRequest)
            })
            getPropertyOwner().then((propertyOwner) => {
                setPropertyOwner(propertyOwner.toLowerCase())
            })

            dispatch({ type: 'reset' })
        }
    }, [state?.dispatched])

    const handleRequestTransfer = () => {
        requestTransfer({
            onSuccess: handleSuccess,
            onError: handleFailure,
        })
    }

    const handleCancelTransferRequest = () => {
        cancelTransferRequest({
            onSuccess: handleSuccess,
            onError: handleFailure,
        })
    }

    const handleApproveTransferRequest = () => {
        approveTransferRequest({
            onSuccess: handleSuccess,
            onError: handleFailure,
        })
    }

    return loading ? (
        <div>Loading...</div>
    ) : (
        <div style={{ marginTop: '10px' }}>
            <Card>
                <Typography variant='h4' component='div'>
                    {propertyDetails?.title}
                </Typography>
                {propertyDetails?.images?.length ? (
                    propertyDetails?.images?.map((image, index) => (
                        <CardMedia
                            key={index}
                            component='img'
                            height='180'
                            image={image.path || '/uploads/default.png'}
                            alt={`Image ${index + 1}`}
                            style={{ objectFit: 'cover', width: '25%' }}
                        />
                    ))
                ) : (
                    <CardMedia
                        key={`default~1`}
                        component='img'
                        height='20%'
                        image={'/uploads/default.png'}
                        alt={`Default Image`}
                        style={{ objectFit: 'cover', width: '20%' }}
                    />
                )}
                <CardContent>
                    <Typography variant='h5' component='div'>
                        {property.owner}
                    </Typography>
                    <Typography variant='h5' component='div'>
                        {propertyDetails?.description}
                    </Typography>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography variant='h5'>
                            Wei: {property.price.toString()}  
                        </Typography>
                        <Typography variant='h5'>
                            Ethers:{' '}
                            {web3.utils.fromWei(
                                property.price.toString(),
                                'ether'
                            )}  
                        </Typography>
                        <Typography variant='h5'>
                            USD:{' '}
                            {(ethPrice *
                                web3.utils.fromWei(
                                    property.price.toString(),
                                    'ether'
                                )).toFixed(4)}
                        </Typography>
                    </div>
                    <Typography variant='h5'>
                        {propertyDetails?.address}
                    </Typography>
                    {isWeb3Enabled &&
                        account?.toLowerCase() !==
                            ownerAddress?.toLowerCase() &&
                        propertyOwner !== account?.toLowerCase() &&
                        !pendingRequest && (
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={handleRequestTransfer}
                            >
                                Request Transfer
                            </Button>
                        )}
                    {isWeb3Enabled &&
                        (pendingRequest?.requester?.toLowerCase() ===
                            account?.toLowerCase() ||
                            (pendingRequest &&
                                account.toLowerCase() ===
                                    ownerAddress.toLowerCase())) && (
                            <Button
                                variant='contained'
                                color='error'
                                onClick={handleCancelTransferRequest}
                            >
                                Cancel Transfer Request
                            </Button>
                        )}
                    {pendingRequest &&
                        account.toLowerCase() ===
                            ownerAddress.toLowerCase() && (
                            <Button
                                variant='contained'
                                color='success'
                                onClick={handleApproveTransferRequest}
                            >
                                Approve Transfer
                            </Button>
                        )}
                </CardContent>
            </Card>
        </div>
    )
}

export default PropertyDetails
