import { SAVE_DATA_POKEMONS, SAVE_ALL_POKEMONS, SAVE_LIMIT, SAVE_OFFSET, SAVE_CURRENT_PAGE, SAVE_INPUT_VALUE, 
    SAVE_IMG_URL, SAVE_POKEMON_NAME, SAVE_POKEMON_ID} from './types'

export function savePokemons(data) {
    return {
        type: SAVE_DATA_POKEMONS,
        payload: data
    }
}

export function saveAllPokemons(data) {
    return {
        type: SAVE_ALL_POKEMONS,
        payload: data
    }
}

export function saveLimit(data) {
    return {
        type: SAVE_LIMIT,
        payload: data
    }
}

export function saveOffset(data) {
    return {
        type: SAVE_OFFSET,
        payload: data
    }
}

export function saveCurrentPage(data) {
    return {
        type: SAVE_CURRENT_PAGE,
        payload: data
    }
}

export function saveInputValue(data) {
    return {
        type: SAVE_INPUT_VALUE,
        payload: data
    }
}

export function saveImgUrl(data) {
    return {
        type: SAVE_IMG_URL,
        payload: data
    }
}

export function savePokemonName(data) {
    return {
        type: SAVE_POKEMON_NAME,
        payload: data
    }
}

export function savePokemonId(data) {
    return {
        type: SAVE_POKEMON_ID,
        payload: data
    }
}