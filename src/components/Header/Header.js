import React, { useState, useEffect } from 'react';
import './Header.css'
import { PokeList, Pokedex } from "../Rout"
import axios from 'axios';

function Header() {
    const [inputValue, setInputValue] = useState('');
    const [pokemon, setPokemon] = useState("pikachu");

    const getPokemon = async () => {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
        const res = await axios.get(url)
        console.log(res);
    }

    useEffect(() => {
        getPokemon()
    }, [])

    const getInput = (e) => {
        setInputValue(e.target.value.toLowerCase())
    }

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
                </div>
            </div>
        </header>
        )

}

export default Header