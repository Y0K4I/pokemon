import axios from "axios"

export const url = `https://pokeapi.co/api/v2/pokemon/`
export const urlLimited = `https://pokeapi.co/api/v2/pokemon?`

export async function apiGet() {
    return(await axios.get(url))
}

export async function apiGetLimited(limit, offset){
    return (await axios.get(urlLimited + `limit=${limit}&offset=${offset}`))
}
