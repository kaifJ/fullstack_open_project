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

const PropertyDetails = ({ property }) => {
    const { isWeb3Enabled, account } = useMoralis()
    const [ownerAddress, setOwnerAddress] = useState('')
    const [pendingRequest, setPendingRequest] = useState(false)
    const [propertyOwner, setPropertyOwner] = useState('')
    const { handleSuccess, handleFailure } = Notification()

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

    return (
        <div style={{ marginTop: '10px' }}>
            <Card>
                {/* <CardMedia></CardMedia> */}
                <CardContent>
                    <Typography variant="h5" component="div">
                        {property.owner}
                    </Typography>
                    <Typography variant="body2">
                        {property.price.toString()}
                    </Typography>
                    <Typography variant="body2">
                        {property.propertyId.toString()}
                    </Typography>
                    {account?.toLowerCase() !== ownerAddress?.toLowerCase() &&
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
                    {(pendingRequest?.requester?.toLowerCase() ===
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
            {/* <h1>{property.owner}</h1>
            <p>{property.price.toString()}</p>
            <p>{property.propertyId.toString()}</p> */}
        </div>
    )
}

export default PropertyDetails
