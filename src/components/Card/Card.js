import React, { Component } from 'react';
import './Card.css';
import styled from 'styled-components';
import loading from './loading.gif';
import { Link } from 'react-router-dom'

const Sprite = styled.img`
    width: 150px;
    height: 150px;
    display: none;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
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
            <StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
                <div className="cards-block_card">
                    <div className="cards-block_card-top">
                        <div className="cards-block_card-top_index">{this.state.pokemonIndex}</div>
                        <div className="cards-block_card-top_name">{this.state.name.toLowerCase().split(' ').map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
                        .join(' ')}</div>
                    </div>
                    <div className="cards-block_card-bottom">
                        {this.state.imgLoading ? (
                            <img src={loading} 
                            style={{ 
                                height: '150px',
                                width: '100%'
                            }}>
                            </img>
                        ): null}
                        <Sprite 
                        className="cards-block_card-bottom_img" 
                        src={this.state.imgUrl}
                        onLoad={() => this.setState({imgLoading: false})}
                        onError={() => this.setState({toManyRequests: true})}
                        style={
                            this.state.toManyRequests ? { display: "none" } :
                            this.state.imgLoading ? null : {display: "block" }
                        }
                        />
                        {this.state.toManyRequests ? (<div className="error">
                            <span className="error-text">Too many requests!</span>
                            </div>) : null}
                    </div>
                </div>
            </StyledLink>
        )
    }
}

export default Card