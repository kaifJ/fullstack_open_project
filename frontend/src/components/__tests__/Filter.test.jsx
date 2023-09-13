import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import FilterComponent from '../Filter'

const mockOnFilter = jest.fn()

const mockFilters = {
    price: 'neutral',
    searchText: '',
}

const renderFilterComponent = () => {
    return render(
        <FilterComponent onFilter={mockOnFilter} filters={mockFilters} />
    )
}

describe('FilterComponent', () => {
    it('renders the component with initial state', () => {
        const { getByLabelText, getByText } = renderFilterComponent()

        expect(getByLabelText('Search by title or description')).toHaveValue('')
        expect(getByText('Sort by price')).toBeInTheDocument()
    })

    it('handles price order button click correctly', () => {
        const { getByText } = renderFilterComponent()

        fireEvent.click(getByText('Sort by price'))

        expect(mockOnFilter).toHaveBeenCalledWith({
            ...mockFilters,
            price: 'ascending',
        })
    })

    it('handles search input change and triggers filter after a delay', async () => {
        const { getByLabelText } = renderFilterComponent()

        fireEvent.change(getByLabelText('Search by title or description'), {
            target: { value: 'New Search Text' },
        })

        await waitFor(() => {
            expect(mockOnFilter).toHaveBeenCalledWith({
                ...mockFilters,
                searchText: 'New Search Text',
            })
        })
    })
})
