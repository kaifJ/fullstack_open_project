/* eslint-disable indent */
const reducer = (state, action) => {
    switch (action.type) {
        case 'dispatched': {
            return {
                ...state,
                dispatched: true,
            }
        }
        case 'reset': {
            return {
                ...state,
                dispatched: false,
            }
        }
        default: {
            return state
        }
    }
}

export default reducer
