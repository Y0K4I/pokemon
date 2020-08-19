import { SAVE_PAGE_NUMBERS, SAVE_TOTAL_PAGES } from "./types";

export function savePageNumbers(data) {
    return {
        type: SAVE_PAGE_NUMBERS,
        payload: data
    }
}

export function saveTotalPages(data) {
    return {
        type: SAVE_TOTAL_PAGES,
        payload: data
    }
}