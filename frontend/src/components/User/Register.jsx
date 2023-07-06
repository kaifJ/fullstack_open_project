import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import registerValidationSchema from './registerValidationSchema'
import registerService from '../../services/register'
import { useNavigate } from 'react-router-dom'
import Toast from '../Toast'

const Register = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = React.useState('')

    const handleSubmit = (values, { setSubmitting }) => {
        registerService.register(values)
            .then(() => {
                navigate('/login')
                setSubmitting(false)
            })
            .catch(err => {
                setErrorMessage(err.response.data.error)
                setTimeout(() => {
                    setErrorMessage('')
                }, 3000)
                setSubmitting(false)
            })
    }

    const goToLogin = () => {
        navigate('/login')
    }

    return (
        <div className='login--container'>
            {errorMessage && <Toast message={errorMessage}/>}
            <h1 className='login--container__label'>Register</h1>
            <Formik
                initialValues={{ name: '', username: '', email: '', password: '', confirmPassword: '' }}
                validationSchema={registerValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="login--form__container">
                        <div>
                            <ErrorMessage className='error--message' name="name" component="div"/>
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                            />
                        </div>
                        <div>
                            <ErrorMessage className='error--message' name="username" component="div"/>
                            <Field
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <ErrorMessage className='error--message' name="email" component="div"/>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <ErrorMessage className='error--message' name="password" component="div"/>
                            <Field
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                            />
                        </div>
                        <div>
                            <ErrorMessage className='error--message' name="confirmPassword" component="div"/>
                            <Field
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                            />
                        </div>
                        <button className='login-button' type="submit" disabled={isSubmitting}>
                            Register
                        </button>
                        <button className='register-button' type="button" onClick={goToLogin}>
                            Login
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Register