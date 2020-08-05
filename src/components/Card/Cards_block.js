import React, { Component } from 'react';
import './Card.css';
import Card from './Card';
import axios from 'axios';

class Cards_block extends Component {
    state = {
        url: "https://pokeapi.co/api/v2/pokemon?limit=964",
        pokemon: null
    };

    async componentDidMount() {
        const res = await axios.get(this.state.url);
        this.setState({ pokemon: res.data['results'] })
    }

    render() {
        return(
            <div>
                {this.state.pokemon ? (<div className="cards-block">
                {this.state.pokemon.map(pokemon => (
                    <Card 
                        name={pokemon.name}
                        url={pokemon.url}
                        key={pokemon.name}
                    />
                ))}
            </div>) : (<h2>Wait!</h2>)}
            </div>
        );
    }
}

export default Cards_block