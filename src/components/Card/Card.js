import React, { Component } from 'react';
import './Card.css';
import styled from 'styled-components';

const Sprite = styled.img`
    width: 100px;
    height: 100px;
`;

class Card extends Component {
    state = {
        name: '',
        imgUrl: '',
        pokemonIndex: '',
        imgLoading: true,
        toManyRequests: false
    }

    componentDidMount() {
        const name = this.props.name;
        const url = this.props.url;
        const pokemonIndex = url.split("/")[url.split('/').length - 2]
        const imgUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`

        this.setState({
            name,
            imgUrl,
            pokemonIndex,

        });
    }

    render() {
        
        return (
            <div className="cards-block_card">
                <div className="cards-block_card-top">
                    <div className="cards-block_card-top_index">{this.state.pokemonIndex}</div>
                    <div className="cards-block_card-top_name">{this.state.name.toLowerCase().split(' ').map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
                    .join(' ')}</div>
                </div>
                <div className="cards-block_card-bottom">
                    <Sprite 
                    className="cards-block_card-bottom_img" 
                    src={this.state.imgUrl}
                    onLoad={() => this.setState({imgLoading: false})}
                    onError={() => this.setState({toManyRequests: true})}
                    />
                    
                </div>
            </div>
        )
    }
}

export default Card