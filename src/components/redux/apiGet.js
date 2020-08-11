import axios from "axios"

export const url = `https://pokeapi.co/api/v2/pokemon/`
export const urlLimited = `https://pokeapi.co/api/v2/pokemon?`

export function apiGet(){
    axios.get(url).then(result=>{
        console.log(result)
    })
}

export function apiGetId(pokemonId){
    axios.get(url+pokemonId).then(result=>{
        console.log(result)
    })
}

export async function apiGetLimited(limit, offset){
    return (await axios.get(urlLimited + `limit=${limit}&offset=${offset}`))
}
