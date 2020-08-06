import React, { Component } from 'react';
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
    }

    render() {
        return (
            <div className="app">
                <h1>{this.state.name} test</h1>
            </div>
        )
    }
}
