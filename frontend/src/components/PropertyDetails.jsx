//eslint-disable-entire-file
import { useEffect, useState, useContext } from 'react'
import { useMoralis } from 'react-moralis'
import { StateContext, DispatchContext } from './Dashboard'
import { weiToEth, ethToUsd } from '../utils/priceConversions'
import formatPrice from '../utils/priceFormatter'
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
} from '@mui/material'
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
import ImageViewer from './ImageViewer'
import InfoModal from './InfoModal'

const PropertyDetails = ({ property, filters }) => {
    const { isWeb3Enabled, account } = useMoralis()
    const [ownerAddress, setOwnerAddress] = useState('')
    const [pendingRequest, setPendingRequest] = useState(false)
    const [propertyOwner, setPropertyOwner] = useState('')
    const { handleSuccess, handleFailure } = Notification()
    const [propertyDetails, setPropertyDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [usdPrice, setUsdPrice] = useState('0')
    const [openImageViewer, setOpenImageViewer] = useState(false)
    const [shouldFilterOut, setShouldFilterOut] = useState(false)
    const [openInfoModal, setOpenInfoModal] = useState(false)

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

    const handleModalClose = () => setOpenImageViewer(false)
    const handleImagePress = () => setOpenImageViewer(true)
    const handleInfoModalClose = () => setOpenInfoModal(false)

    const state = useContext(StateContext)
    const dispatch = useContext(DispatchContext)

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

    useEffect(() => {
        if (property?.price) {
            const eth = weiToEth(property.price.toString())
            ethToUsd(eth).then((usd) => {
                setUsdPrice(usd.toString())
            })
        }
    }, [property?.price])

    useEffect(() => {
        propertyServices
            .getPropertyById(property.propertyId.toString())
            .then((_propertyDetails) => {
                setPropertyDetails(_propertyDetails)
            })
    }, [property?.owner])

    useEffect(() => {
        if (filters.searchText && filters.searchText.length > 0) {
            if (
                propertyDetails?.title
                    ?.toLowerCase()
                    .includes(filters.searchText.toLowerCase()) ||
                propertyDetails?.description
                    ?.toLowerCase()
                    .includes(filters.searchText.toLowerCase())
            ) {
                setShouldFilterOut(false)
            } else {
                setShouldFilterOut(true)
            }
        } else {
            setShouldFilterOut(false)
        }
    }, [filters])

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
            onSuccess: (tx) => {
                propertyServices.updatePropertyById(
                    property.propertyId.toString(),
                    { isPropertyForSale: false }
                )
                handleSuccess(tx)
            },
            onError: handleFailure,
        })
    }

    const handleViewRequesterInfo = () => {
        setOpenInfoModal(true)
    }

    // const handlePublishForSale = () => {
    //     propertyServices.updatePropertyById(property.propertyId.toString(), {
    //         isPropertyForSale: true,
    //     })
    // }

    return loading ? (
        <div>Loading...</div>
    ) : (
        <Box
            className="property-card"
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="65%"
            height={shouldFilterOut ? '0px' : '100%'}
        >
            {pendingRequest && (
                <InfoModal
                    isModalOpen={openInfoModal}
                    handleClose={handleInfoModalClose}
                    requesterInfo={pendingRequest}
                />
            )}
            {propertyDetails?.images && (
                <ImageViewer
                    images={propertyDetails?.images.length ? propertyDetails.images : [{ path: '/uploads/default.png' }]}
                    open={openImageViewer}
                    onClose={handleModalClose}
                />
            )}
            <Card style={{ width: '100%', marginTop: '20px' }}>
                <Typography variant="h4" component="div" mb={1} ml={2} mt={2}>
                    {propertyDetails?.title}
                </Typography>
                <Box display="flex" flexDirection="row" ml={2}>
                    {propertyDetails?.images?.length ? (
                        propertyDetails?.images?.map((image, index) => (
                            <div
                                onClick={handleImagePress}
                                className="image-container"
                                key={index}
                            >
                                <CardMedia
                                    key={index}
                                    component="img"
                                    height="180"
                                    image={image.path || '/uploads/default.png'}
                                    alt={`Image ${index + 1}`}
                                    style={{
                                        objectFit: 'cover',
                                        width: '100%',
                                        margin: '5px',
                                    }}
                                />
                            </div>
                        ))
                    ) : (
                        <div
                            onClick={handleImagePress}
                            className="image-container"
                        >
                            <CardMedia
                                key={'default~1'}
                                component="img"
                                height="20%"
                                image={'/uploads/default.png'}
                                alt={'Default Image'}
                                style={{
                                    objectFit: 'cover',
                                    width: '100%',
                                    margin: '5px',
                                }}
                            />
                        </div>
                    )}
                </Box>
                <CardContent>
                    <Typography variant="h5" component="div">
                        <span className="form-label">Owner:</span>{' '}
                        {property.owner}
                    </Typography>
                    <Typography variant="h5" component="div">
                        <span className="form-label">Description:</span>{' '}
                        {propertyDetails?.description}
                    </Typography>
                    <div className="details" style={{ margin: '10px 0' }}>
                        <Typography variant="h5" mr={2}>
                            <span className="form-label">USD:</span>{' '}
                            {formatPrice(usdPrice)}
                        </Typography>
                        <Typography variant="h5" mr={2}>
                            <span className="form-label">Ethers:</span>{' '}
                            {weiToEth(property.price.toString())}
                        </Typography>
                        <Typography variant="h5">
                            <span className="form-label">Wei:</span>{' '}
                            {property.price.toString()}
                        </Typography>
                    </div>
                    <Typography variant="h5" style={{ margin: '10px 0' }}>
                        <span className="form-label">Address:</span>{' '}
                        {propertyDetails?.address}
                    </Typography>
                    {propertyDetails.isPropertyForSale &&
                        isWeb3Enabled &&
                        account?.toLowerCase() !==
                        ownerAddress?.toLowerCase() &&
                        propertyOwner !== account?.toLowerCase() &&
                        !pendingRequest && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleRequestTransfer}
                                style={{ marginRight: '10px' }}
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
                                style={{ marginRight: '10px' }}
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
                                style={{ marginRight: '10px' }}
                            >
                                Approve Transfer
                            </Button>
                        )}
                    {pendingRequest &&
                        account.toLowerCase() ===
                        ownerAddress.toLowerCase() && (
                            <Button
                                variant="contained"
                                color="info"
                                onClick={handleViewRequesterInfo}
                                style={{ marginRight: '10px' }}
                            >
                                View requester info
                            </Button>
                        )}
                    {/* {account.toLowerCase() === propertyOwner.toLowerCase() &&
                        !propertyDetails.isPropertyForSale && (
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handlePublishForSale}
                                style={{
                                    marginBottom: '10px',
                                    marginRight: '10px',
                                }}
                            >
                                Publish for sale
                            </Button>
                        )} */}
                </CardContent>
            </Card>
        </Box>
    )
}

export default PropertyDetails
