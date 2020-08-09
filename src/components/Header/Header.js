import React, { useState, useEffect } from 'react';
import './Header.css'
import { PokeList, Pokedex } from "../Rout"
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Header() {
    const [pokemon, setPokemon] = useState('');
    const [pokeId, setPokeId] = useState('');

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    const getPokemon = async () => {
        const res = await axios.get(url)
        setPokeId(res.data.id)
        console.log(res);
    }

    const getInput = (e) => {
        setPokemon(e.target.value.toLowerCase())
    }

    const findPokemon = (e) => {
        e.preventDefault()
        getPokemon()
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
                    <button onClick={findPokemon}>find</button>
                </div>
            </div>
        </header>
        )

}
