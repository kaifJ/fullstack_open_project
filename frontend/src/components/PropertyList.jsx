// eslint-disable
import { useMoralis } from 'react-moralis'
import { useEffect, useState, useContext } from 'react'
import { StateContext, DispatchContext } from './Dashboard'
import PropertyDetails from './PropertyDetails'
import { GetAllProperties } from '../contractServices/index.js'
import { Button } from '@mui/material'
import EmptyList from './EmptyList'
import filterHelper from '../utils/filterHelper'
import FilterComponent from './Filter'
import KeyboardArrowLeftRounded from '@mui/icons-material/KeyboardArrowLeftRounded'
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded'

export default function LotteryEntrance() {
    const { isWeb3Enabled } = useMoralis()
    const state = useContext(StateContext)
    const [loading, setLoading] = useState(true)
    const dispatch = useContext(DispatchContext)
    const [filters, setFilters] = useState({
        price: 'neutral',
        searchText: '',
    })

    const [page, setPage] = useState(1)
    const [properties, setProperties] = useState([])
    const [sortedList, setSortedList] = useState([])

    const getAllProperties = GetAllProperties()

    async function updateUIValues() {
        const properties = await getAllProperties()
        setProperties(properties || [])
        dispatch && dispatch({ type: 'reset' })
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues().then(() => setLoading(false))
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        if (state?.dispatched) {
            updateUIValues()
        }
    }, [state?.dispatched])

    useEffect(() => {
        const sortedList = filterHelper([...properties], filters.price)
        setSortedList(sortedList)
    }, [filters.price, properties])

    return loading ? (
        <div className="loader--container">Loading...</div>
    ) : properties.length === 0 ? (
        <EmptyList message={isWeb3Enabled ? '': 'Please connect to wallet'}/>
    ) : (
        <div className="property-list--container">
            <FilterComponent onFilter={setFilters} filters={filters}/>
            {sortedList.slice(3 * (page - 1), 3 * page).map((property) => (
                <PropertyDetails
                    key={`${property.propertyId.toString()}~${property.price.toString()}`}
                    property={property}
                    filters={filters}
                />
            ))}
            {sortedList.length > 3 && (
                <div className="page-navigator">
                    <Button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        {' '}
                        <KeyboardArrowLeftRounded
                            style={{ fontSize: '20px' }}
                        />{' '}
                    </Button>
                    <span className="page--indicator">{page}</span>
                    <Button
                        onClick={() => setPage(page + 1)}
                        disabled={page === Math.ceil(sortedList.length / 3)}
                    >
                        {' '}
                        <KeyboardArrowRightRounded
                            style={{ fontSize: '20px' }}
                        />{' '}
                    </Button>
                </div>
            )}
        </div>
    )
}
