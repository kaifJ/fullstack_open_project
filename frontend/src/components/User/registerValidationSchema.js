import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('Please confirm your password').oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

export default validationSchema