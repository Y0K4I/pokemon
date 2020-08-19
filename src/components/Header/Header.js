import React, { useState, useEffect } from 'react';
import './Header.css'
import { PokeList, Pokedex } from "../Rout"
import { createStore } from 'redux';
import pokemonReducer from '../redux/reducers/pokemonReducer'
import { connect } from 'react-redux';
import { saveInputValue } from '../redux/actions/pokemons/actions';
import { apiGet } from '../redux/apiGet';


function Header(props) {
    const [pokeId, setPokeId] = useState(1)

    const getInput = (e) => {
        props.saveInputValue(e.target.value.toLowerCase())
    }

    const findPokemon = () => {
        window.location.assign(`http://localhost:3000/#/PokeList/pokemon/${props.pokemons.inputValue}`)
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

export default connect(
    (state) => {
        const {pokemons} = state
        return {
            pokemons
        }
    },
    dispatch => ({
        saveInputValue: data => dispatch(saveInputValue(data)),
    })
)(Header)