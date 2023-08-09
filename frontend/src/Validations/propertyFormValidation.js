import * as Yup from 'yup'

export const propertyFormValidation = Yup.object().shape({
    title: Yup.string()
        .required('Title is required')
        .min(3, 'Title must be at least 3 characters long'),
    price: Yup.string()
        .required('Price is required')
        .test('positive-number', 'Price must be a positive number', (value) => {
            const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) // Remove non-numeric characters
            return numericValue > 0
        }),
    description: Yup.string().required('Description is required'),
    address: Yup.string().required('Address is required'),
    images: Yup.array()
        .min(1, 'At least one image is required')
        .max(2, 'Only up to 2 images allowed'),
})
