import { SAVE_PAGE_NUMBERS, SAVE_TOTAL_PAGES } from "../actions/pagination/types"

const initialState = {
    pageNumbers: [],
    totalPages: 0
}

export default function paginationReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_PAGE_NUMBERS:
            return {...state, pageNumbers: action.payload}
        case SAVE_TOTAL_PAGES:
            return {...state, totalPages: action.payload}
        default:
            return state
    }
}