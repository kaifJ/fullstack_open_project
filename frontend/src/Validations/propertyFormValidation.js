import * as Yup from 'yup'

export const propertyFormValidation = Yup.object().shape({
    title: Yup.string().required('Title is required').min(3, 'Title must be at least 3 characters long'),
    price: Yup.string()
        .required('Price is required')
        .transform((value) => (isNaN(value) ? undefined : parseInt(value)))
        .min(0, 'Price must be a positive number'),
    description: Yup.string().required('Description is required'),
    address: Yup.string().required('Address is required'),
    propertyId: Yup.string().required('Property ID is required'),
    propertyOwner: Yup.string().required('Property Owner is required'),
    images: Yup.array()
        .min(1, 'At least one image is required')
        .max(2, 'Only up to 2 images allowed'),
})