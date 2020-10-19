import axios from "axios"

export const url = `https://pokemonapishort.herokuapp.com/PokeApi/getPokemons`
export const urlOfPokemon = `https://pokemonapishort.herokuapp.com/PokeApi/getStatOf/`
export const urlOfCount = `https://pokemonapishort.herokuapp.com/PokeApi/getPokemonsCount`
export const urlOfTypes = `https://pokemonapishort.herokuapp.com/PokeApi/getPokemonsTypes`

export async function apiGetPokemon(pokeIdx) {
    return axios.get(urlOfPokemon+pokeIdx)
}

export async function apiGetCount() {
    return axios.get(urlOfCount)
}

export async function apiGetTypes() {
    return axios.get(urlOfTypes)
}

export function apiGetLimited(limit, offset, filter){
    return axios.post(url, {...filter, limit: limit, offset: offset})
}