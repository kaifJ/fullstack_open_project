import React from 'react'
import { render, screen } from '@testing-library/react'
import Toast from '../Toast'

describe('Toast', () => {
    it('renders a toast message with the provided message', () => {
        render(<Toast message="Test Message" />)
        const toastMessage = screen.getByText('Test Message')
        expect(toastMessage).toBeInTheDocument()
    })
})
