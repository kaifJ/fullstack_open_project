import { useState, useEffect } from 'react'
import { AddProperty, GetNextPropertyId } from '../contractServices/index.js'
import Notification from './Notificaiton'
import { useMoralis } from 'react-moralis'
import propertyService from '../services/property'
import { propertyFormValidation } from '../Validations/propertyFormValidation'

const PropertyForm = ({ handleClose }) => {
    const { isWeb3Enabled, account } = useMoralis()

    const [images, setImages] = useState([])
    const [nextPropertyId, setNextPropertyId] = useState(0)
    const [formValues, setFormValues] = useState({
        title: '',
        price: '',
        description: '',
        address: '',
    })
    const [errors, setErrors] = useState({})

    const addProperty = AddProperty(formValues.price)

    const getNextPropertyId = GetNextPropertyId()

    useEffect(() => {
        if (isWeb3Enabled) {
            getNextPropertyId().then((nextId) => {
                setNextPropertyId(nextId)
            })
        }
    }, [isWeb3Enabled])

    const handleImageChange = (event) => {
        const files = event.target.files
        const imageArray = [...images]
        for (let i = 0; i < files.length && i < 2; i++) {
            imageArray.push(files[i])
        }
        setImages(imageArray)
    }

    const { handleSuccess, handleFailure } = Notification()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await propertyFormValidation.validate(formValues,  { abortEarly: false })
            setErrors({})
        } catch (validationErrors) {
            const errors = {}
            validationErrors.inner.forEach((error) => {
                errors[error.path] = error.message
            })
            setErrors(errors)
        }

        try {
            const formData = new FormData()
            formData.append('title', formValues.title)
            formData.append('price', formValues.price)
            formData.append('description', formValues.description)
            formData.append('address', formValues.address)
            formData.append('propertyId', nextPropertyId.toString())
            formData.append('propertyOwner', account)
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i])
            }
            await propertyService.createProperty(formData)
            await addProperty({
                onSuccess: handleSuccess,
                onError: handleFailure,
            })
            handleClose()
        } catch (err) {
            alert(err)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }))
    }

    return (
        <div>
            <h1>Property Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    {/* <label htmlFor="title">Title:</label> */}
                    {errors.title && <span>{errors.title}</span>}
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title *"
                        value={formValues.title}
                        onChange={handleChange}
                        required
                    />

                </div>
                <div>
                    {/* <label htmlFor="price">Price:</label> */}
                    {errors.price && <span>{errors.price}</span>}
                    <input
                        type="text"
                        id="price"
                        name="price"
                        required
                        placeholder="Price in wei *"
                        value={formValues.price}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    {/* <label htmlFor="description">Description:</label> */}
                    {errors.description && <span>{errors.description}</span>}
                    <textarea
                        name="description"
                        id="description"
                        required
                        placeholder="Description *"
                        value={formValues.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    {/* <label htmlFor="address">Address:</label> */}
                    {errors.address && <span>{errors.address}</span>}
                    <input
                        type="text"
                        id="address"
                        name="address"
                        required
                        placeholder="Address *"
                        value={formValues.address}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    {/* <label htmlFor="image">Images:</label> */}
                    {errors.images && <span>{errors.images}</span>}
                    <input
                        type="file"
                        name="images"
                        id="images"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                    />
                    {images.length > 0 && (
                        <div>
                            <p>Selected Images:</p>
                            <ul>
                                {images.map((image) => (
                                    <li key={image.name}>{image.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <button className="login-button" type="submit">
          Submit
                </button>
            </form>
        </div>
    )
}

export default PropertyForm
