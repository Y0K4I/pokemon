import React, { useEffect, useState } from 'react';
import './Pokemon.css';
import Header from '../Header/Header'
import { createStore } from 'redux';
import pokemonReducer from '../redux/reducers/pokemonReducer';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { apiGetPokemon } from '../redux/apiGet';
import { savePokemonName, saveImgUrl } from '../redux/actions/pokemons/actions';

const store = createStore(pokemonReducer)

const TypesStyles = {
    bug: '839209',
    dark: '503D2F',
    dragon: '7460DD',
    electric: 'FABF26',
    fairy: 'F5C1F4',
    fighting: '84361E',
    fire: 'D43308',
    flying: '6075D2',
    ghost: '59599F',
    grass: '83C44E',
    ground: 'CDAB54',
    ice: '6FD2F4',
    normal: '34290A',
    poison: '8F4595',
    psychic: 'DB3164',
    rock: '9E863C',
    steel: '7B7B87',
    water: '0D67C1'
}

function Pokemon() {
    const [pokeId, setPokeId] = useState(window.location.hash.split("/")[window.location.hash.split('/').length - 1])
    const [pokemonName, setPokemonName] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [pokemonIndex, setPokemonIndex] = useState(0)
    const [pokemonTypes, setPokemonTypes] = useState([1])
    const [hp, setHp] = useState(0)
    const [attack, setAttack] = useState(0)
    const [defense, setDefense] = useState(0)
    const [specialAttack, setSpecialAttack] = useState(0)
    const [specialDefense, setSpecialDefense] = useState(0)
    const [speed, setSpeed] = useState(0)

    const currentId = Number(pokeId)

    useEffect(() => {
        apiGetPokemon(pokeId).then(result => {
            console.log(result);
            setPokemonIndex(result.data.id)
            setImgUrl(`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${result.data.id}.png?raw=true`)
            setPokemonName(result.data.name)
            setPokemonTypes(result.data.types.map(type => type))
            setHp(result.data.hp)
            setAttack(result.data.attack)
            setDefense(result.data.defense)
            setSpecialAttack(result.data.specialAttack)
            setSpecialDefense(result.data.specialDefense)
            setSpeed(result.data.speed)
        })

        window.location.assign(`http://localhost:3000/#/PokeList/pokemon/${pokeId}`);
    }, [pokeId, window.location.hash])

    

    return (
        <div className="app">
            <Header />
            <div className="display">
                <div className="display-block">
                    <div className="display-block-pokemon">
                        <div className="display-block-pokemon_data">
                            <div className="display-block-pokemon_data_img">
                                <img src={imgUrl} alt='nema kartinki'></img>
                            </div>
                            <div className="display-block-pokemon_data_name">
                                <span className="display-block-pokemon_data_name-idx">{pokemonIndex}</span>
                                <span className="display-block-pokemon_data_name-name">{pokemonName.toLowerCase().split(' ').map(letter => letter.charAt(0).toUpperCase() 
                                    + letter.substring(1)).join(' ')}</span>
                                {pokemonTypes.map(type => ( 
                                    <span className="display-block-pokemon_data_name-type" key={type}
                                    style={{backgroundColor: `#${TypesStyles[type]}`, color: 'white'}}>{type}</span> 
                                ))}
                            </div>
                        </div>
                        
                        <div className="display-block-pokemon_stats">
                            hp: {hp} <br/>
                            attack: {attack} <br/>
                            defense: {defense} <br/>
                            specialAttack: {specialAttack} <br/>
                            specialDefense: {specialDefense} <br/>
                            speed: {speed} <br/>

                        </div>
                        <button onClick={() => setPokeId(currentId + 1)}>next</button>
                        <button onClick={() => setPokeId(currentId - 1)}>prev</button>
                    </div>
                </div>
            </div>
        </div>
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
        savePokemonName: data => dispatch(savePokemonName(data)),
    })
)(Pokemon)