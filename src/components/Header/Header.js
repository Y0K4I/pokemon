import React, { useState, useEffect } from 'react';
import './Header.css'
import { PokeList, Pokedex } from "../Rout"
import axios from 'axios';
import { createStore } from 'redux';
import {rootReducer} from '../redux/rootReducer'
import { url, apiGet } from '../redux/apiGet'

const store = createStore(rootReducer)

export default function Header() {
    const [pokemon, setPokemon] = useState('');
    const [pokeId, setPokeId] = useState('');

    const newUrl = url + pokemon

    const getInput = (e) => {
        setPokemon(e.target.value.toLowerCase())
    }

    const findPokemon = async() => {
    //    await axios.get(newUrl).then(result=>{
    //         console.log(result);
    //     })
        // setPokeId(pokeId)
       apiGet(pokemon)
    }
    
    // useEffect(() => {
    // if(pokeId) window.location.assign(`http://localhost:3000/#/PokeList/pokemon/${pokeId}`)
    // },[pokeId])

    return (
        <header className="header">
            <div className="header-block">
                <div className="header-block_logo">
                    <img src="logo.jpg" alt="logo"></img>
                    <Pokedex />
                </div>
                <div className="header-block_nav">
                    <PokeList />
                   </div>
                <div className="header-block_search">
                    <form>
                        <label>
                            <input onChange={getInput}></input>
                        </label>
                    </form>
                    <button onClick={findPokemon}>find</button>
                </div>
            </div>
        </header>
    )
}
