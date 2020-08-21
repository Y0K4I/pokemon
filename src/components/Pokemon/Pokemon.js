import React, { useEffect } from 'react';
import './Pokemon.css';
import Header from '../Header/Header'
import { createStore } from 'redux';
import pokemonReducer from '../redux/reducers/pokemonReducer';
import { connect } from 'react-redux';
import { apiGetPokemon } from '../redux/apiGet';
import { savePokemonName, savePokemonTypes } from '../redux/actions/pokemons/actions';

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

function Pokemon(props) {
    const pokeId = window.location.hash.split("/")[window.location.hash.split('/').length - 1]
    const imgUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokeId}.png?raw=true`

    useEffect(() => {
        apiGetPokemon(pokeId).then(result => {
            props.savePokemonName(result.data.name)
        })
    }, [pokeId])
    
    // state = {
    //     name: '',
    //     imgUrl: '',
    //     pokemonIndex: '',
    //     stats: {
    //       hp: "",
    //       attack: "",
    //       defense: "",
    //       specialAttack: "",
    //       specialDefense: "",
    //       speed: "",
    //     },
    //     types: [],
    // };

    // async componentDidMount() {
    //     const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    //     const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    //     const pokemonResponse = await axios.get(pokemonUrl);

    //     const name = pokemonResponse.data.name;
    //     const imgUrl = pokemonResponse.data.sprites.front_default;

    //     let { hp, attack, defense, specialAttack, specialDefense, speed } = '';

    //     pokemonResponse.data.stats.map(stat => {
    //         switch (stat.stat.name) {
    //             case 'hp':
    //                 hp = stat.base_stat;
    //                 break;
    //             case 'attack':
    //                 attack = stat.base_stat;
    //                 break;
    //             case 'defense':
    //                 defense = stat.base_stat;
    //                 break;
    //             case 'special-attack':
    //                 specialAttack = stat.base_stat;
    //                 break;
    //             case 'special-defense':
    //                 specialDefense = stat.base_stat;
    //                 break;
    //             case 'speed':
    //                 speed = stat.base_stat;
    //                 break;
    //         }
    //     })

    //     const types = pokemonResponse.data.types.map(type => type.type.name)

    //     this.setState({ name, imgUrl, pokemonIndex, hp, attack, defense, specialAttack, specialDefense, speed, types })
    // }
    

    return (
        <div className="app">
            <Header />
            <div className="display">
                <div className="display-block">
                    <div className="display-block-pokemon">
                        <div className="display-block-pokemon_data">
                            <div className="display-block-pokemon_data_img">
                                <img src={imgUrl}></img>
                            </div>
                            <div className="display-block-pokemon_data_name">
                                <span className="display-block-pokemon_data_name-idx">{pokeId}</span>
                                <span className="display-block-pokemon_data_name-name">{props.pokemons.pokemonName.toLowerCase().split(' ').map(letter => letter.charAt(0).toUpperCase() 
                                + letter.substring(1)).join(' ')}</span>
                                {props.pokemons.pokemonTypes.map(type => (
                                    <span className="display-block-pokemon_data_name-type" key={type}
                                    style={{backgroundColor: `#${TypesStyles[type]}`, color: 'white'}}>{type}</span>
                                ))}
                            </div>
                        </div>
                        <div className="display-block-pokemon_stats">
                            HP: <br />
                            Attack: <br />
                            Defense: <br />
                            Sp Attack: <br />
                            Sp Defense: <br />
                            Speed: 
                        </div>
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
        savePokemonTypes: data => dispatch(savePokemonTypes(data))
    })
)(Pokemon)