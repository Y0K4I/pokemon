import { SAVE_DATA_POKEMONS, SAVE_ALL_POKEMONS, SAVE_LIMIT, SAVE_OFFSET, SAVE_CURRENT_PAGE, SAVE_INPUT_VALUE, SAVE_POKEMON_INDEX } from "../actions/pokemons/types"

const initialState = {
    pokemonsCount: 0,
    pokemons: [],
    pokemonsLimit: 10,
    pokemonsOffset: 0,
    pokemonsCurrentPage: 1,
    inputValue: '',
    pokemonIndex: ''
}

export default function pokemonReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_DATA_POKEMONS:
            return {...state, pokemons:[...action.payload]}
        case SAVE_ALL_POKEMONS:
            return {...state, pokemonsCount: action.payload}
        case SAVE_LIMIT:
            return {...state, pokemonsLimit: action.payload}
        case SAVE_OFFSET:
            return {...state, pokemonsOffset: action.payload}
        case SAVE_CURRENT_PAGE:
            return {...state, pokemonsCurrentPage: action.payload}
        case SAVE_INPUT_VALUE:
            return {...state, inputValue: action.payload}
        case SAVE_POKEMON_INDEX:
            return {...state, pokemonIndex: action.payload}
        default:
            return state
    }
}