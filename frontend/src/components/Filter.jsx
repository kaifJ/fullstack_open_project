import React, { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import TextField from '@mui/material/TextField'

const MAX_SEARCH_LENGTH = 50

const FilterComponent = ({ onFilter, filters }) => {
    const [priceOrder, setPriceOrder] = useState(filters.price)
    const [searchTitle, setSearchTitle] = useState(filters.searchText)
    const searchTimeoutRef = useRef(null)

    const handlePriceOrder = () => {
        if (priceOrder === 'neutral') {
            setPriceOrder('ascending')
        } else if (priceOrder === 'ascending') {
            setPriceOrder('descending')
        } else {
            setPriceOrder('neutral')
        }
    }

    useEffect(() => {onFilter({ ...filters, price: priceOrder })}, [priceOrder])

    const handleSearchTextChange = (event) => {
        const newSearchText = event.target.value
        if (newSearchText.length > MAX_SEARCH_LENGTH) {
            alert('Character limit exceeded')
            return
        }

        setSearchTitle(newSearchText)

        // Clear previous timeout and set a new one
        clearTimeout(searchTimeoutRef.current)
        searchTimeoutRef.current = setTimeout(() => {
            const filters = {
                price: priceOrder,
                searchText: newSearchText,
            }
            onFilter(filters)
        }, 500) // Adjust the delay as needed (in milliseconds)
    }

    const renderChips = () => {
        const chips = []
        if (priceOrder !== 'neutral') {
            chips.push(
                <Chip
                    key="price"
                    label={`Price ${
                        priceOrder === 'ascending' ? 'Ascending' : 'Descending'
                    }`}
                    size='large'
                    color="info"
                    onDelete={() => {
                        setPriceOrder('neutral')
                        onFilter({
                            ...filters,
                            price: 'neutral',
                        })
                        return
                    }}
                />
            )
        }

        if (searchTitle) {
            chips.push(
                <Chip
                    key="textSearch"
                    label={`Text Search ${searchTitle}`}
                    size='large'
                    color="info"
                    onDelete={() => {
                        setSearchTitle('')
                        onFilter({ ...filters, searchText: '' })
                    }}
                />
            )
        }
        return chips
    }

    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            width="65%"
            borderRadius={2}
            mt={1}
            // backgroundColor="#FFFFFF"
        >
            <IconButton
                onClick={handlePriceOrder}
                style={{ borderRadius: 4, width: '20%', height: '5rem' }}
                color="primary"
                size="large"
                sx={{
                    backgroundColor: 'primary.main', // Use the primary color for background
                    '&:hover': {
                        backgroundColor: 'primary.dark', // Darker color on hover
                    },
                }}
            >
                {
                    <Typography variant="body1" color="white">
                        Sort by price
                    </Typography>
                }
                {priceOrder === 'ascending' && (
                    <ArrowUpwardIcon style={{ color: 'white' }} />
                )}
                {priceOrder === 'descending' && (
                    <ArrowDownwardIcon style={{ color: 'white' }} />
                )}
            </IconButton>
            <TextField
                variant='filled'
                label="Search by title or description"
                color="primary"
                margin="none"
                size="large"
                value={searchTitle}
                onChange={handleSearchTextChange}
                style={{ marginLeft: '3rem', width: '300px', backgroundColor: 'white', borderRadius: '4px', }}
            />
            <Box ml={2} display="flex" flexDirection="row">
                {renderChips().map((chip) => (
                    <Box key={chip.key} mr={1}>
                        {chip}
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default FilterComponent
