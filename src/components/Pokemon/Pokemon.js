import React, { Component } from 'react';
import './Pokemon.css'
import axios from 'axios';

export default class Pokemon extends Component {
    state = {
        name: '',
        imgUrl: '',
        pokemonIndex: ''
    };

    async componentDidMount() {
        const { pokemonIndex }  = this.props.match.params;
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

        const pokemonResponse = await axios.get(pokemonUrl);

        const name = pokemonResponse.data.name;
        this.setState({ name })
        const imgUrl = pokemonResponse.data.sprites.front_default;
        this.setState({ imgUrl })
    }

    render() {
        return (
            <div className="app">
                <div className="display">
                    <div className="display-block">
                        <div className="display-block_name">
                            <span>{this.state.pokemonIndex}</span>
                            <span>{this.state.name}</span>
                        </div>
                        <div className="display-block_img">
                            <img src={this.state.imgUrl}></img>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
