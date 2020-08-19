import { combineReducers } from "redux";
import pokemonReducer from './pokemonReducer'
import paginationReducer from "./paginationReducer";

export const rootReducer = combineReducers({
    pokemons: pokemonReducer,
    pagination: paginationReducer
})