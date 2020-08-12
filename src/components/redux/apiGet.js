import axios from "axios"

export const url = `https://pokeapi.co/api/v2/pokemon/`
export const urlAll = `https://pokeapi.co/api/v2/pokemon?limit=964`
export const urlLimited = `https://pokeapi.co/api/v2/pokemon?`

export async function apiGet() {
    return(await axios.get(url))
}

export async function apiGetAll() {
    return(await axios.get(urlAll))
}

export function apiGetId(pokemonId) {
    axios.get(url+pokemonId).then(result=>{
        console.log(result)
    })
}

export async function apiGetLimited(limit, offset){
    return (await axios.get(urlLimited + `limit=${limit}&offset=${offset}`))
}
