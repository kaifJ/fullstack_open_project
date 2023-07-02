import React from 'react'
import Login from '../Login'
import { render, screen } from '@testing-library/react'

jest.mock('../../../services/login', () => ({
    login: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}))

describe('Login component', () => {
    it('should render the component', () => {
        render(<Login />)
        expect(screen.getByRole('heading')).toHaveTextContent('Login')
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
        expect(screen.getByText('Register')).toBeInTheDocument()
    })
})
