import React, { Component } from 'react';
import './Pokemon.css';
import Header from '../Header/Header'
import axios from 'axios';

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

export default class Pokemon extends Component {
    state = {
        name: '',
        imgUrl: '',
        pokemonIndex: '',
        stats: {
          hp: "",
          attack: "",
          defense: "",
          specialAttack: "",
          specialDefense: "",
          speed: "",
        },
        types: [],
    };

    async componentDidMount() {
        const { pokemonIndex }  = this.props.match.params;
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

        const pokemonResponse = await axios.get(pokemonUrl);

        const name = pokemonResponse.data.name;
        const imgUrl = pokemonResponse.data.sprites.front_default;

        let { hp, attack, defense, specialAttack, specialDefense, speed } = '';

        pokemonResponse.data.stats.map(stat => {
            switch (stat.stat.name) {
                case 'hp':
                    hp = stat.base_stat;
                    break;
                case 'attack':
                    attack = stat.base_stat;
                    break;
                case 'defense':
                    defense = stat.base_stat;
                    break;
                case 'special-attack':
                    specialAttack = stat.base_stat;
                    break;
                case 'special-defense':
                    specialDefense = stat.base_stat;
                    break;
                case 'speed':
                    speed = stat.base_stat;
                    break;
            }
        })

        const types = pokemonResponse.data.types.map(type => type.type.name)

        this.setState({ name, imgUrl, pokemonIndex, hp, attack, defense, specialAttack, specialDefense, speed, types })
    }

    render() {
        return (
            <div className="app">
                <Header />
                <div className="display">
                    <div className="display-block">
                        <div className="display-block-pokemon">
                            <div className="display-block-pokemon_data">
                                <div className="display-block-pokemon_data_img">
                                    <img src={this.state.imgUrl}></img>
                                </div>
                                <div className="display-block-pokemon_data_name">
                                    <span className="display-block-pokemon_data_name-idx">{this.state.pokemonIndex}</span>
                                    <span className="display-block-pokemon_data_name-name">{this.state.name.toLowerCase().split(' ').map(letter => letter.charAt(0).toUpperCase() 
                                    + letter.substring(1)).join(' ')}</span>
                                    {this.state.types.map(type => (
                                        <span className="display-block-pokemon_data_name-type" 
                                        style={{backgroundColor: `#${TypesStyles[type]}`, color: 'white'}}>{type}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="display-block-pokemon_stats">
                                HP: {this.state.hp}<br />
                                Attack: {this.state.attack}<br />
                                Defense: {this.state.defense}<br />
                                Sp Attack: {this.state.specialAttack}<br />
                                Sp Defense: {this.state.specialDefense} <br />
                                Speed: {this.state.speed}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
