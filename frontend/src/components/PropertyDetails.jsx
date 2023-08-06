import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
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

const PropertyDetails = ({ property }) => {
    const { isWeb3Enabled, account } = useMoralis()
    const [ownerAddress, setOwnerAddress] = useState('')
    const [pendingRequest, setPendingRequest] = useState(false)
    const [propertyOwner, setPropertyOwner] = useState('')
    const { handleSuccess, handleFailure } = Notification()
    const [propertyDetails, setPropertyDetails] = useState({})
    const [loading, setLoading] = useState(false)

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

    useEffect(() => {
        propertyServices
            .getPropertyById(property.propertyId.toString())
            .then((_propertyDetails) => {
                setPropertyDetails(_propertyDetails)
                setLoading(false)
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
                <Typography variant="h5" component="div">
                    {propertyDetails?.title}
                </Typography>
                {propertyDetails?.images?.map((image, index) => (
                    <CardMedia
                        key={index}
                        component="img"
                        height="200"
                        image={image.path}
                        alt={`Image ${index + 1}`}
                        style={{ objectFit: 'cover', width: '33%' }}
                    />
                ))}
                <CardContent>
                    <Typography variant="h5" component="div">
                        {property.owner}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {propertyDetails?.description}
                    </Typography>
                    <Typography variant="body2">
                        {property.price.toString()}
                    </Typography>
                    <Typography variant="body2">
                        {propertyDetails?.address}
                    </Typography>
                    {isWeb3Enabled &&
                        account?.toLowerCase() !==
                            ownerAddress?.toLowerCase() &&
                        propertyOwner !== account?.toLowerCase() &&
                        !pendingRequest && (
                            <Button
                                variant="contained"
                                color="primary"
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
                                variant="contained"
                                color="error"
                                onClick={handleCancelTransferRequest}
                            >
                                Cancel Transfer Request
                            </Button>
                        )}
                    {pendingRequest &&
                        account.toLowerCase() ===
                            ownerAddress.toLowerCase() && (
                            <Button
                                variant="contained"
                                color="success"
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
