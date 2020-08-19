import React, { useState, useEffect } from 'react';
import './Card.css';
import styled from 'styled-components';
import loading from './loading.gif';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { savePokemonIndex, saveImgUrl } from '../redux/actions/pokemons/actions';

const Sprite = styled.img`
    width: 150px;
    height: 150px;
    display: none;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
`;

function Card({name, url, ...props}) {
    const [imgLoading, setImgLoading] = useState(true)
    const [toManyRequests, setToManyRequests] = useState(false)

    useEffect(() => {
        props.savePokemonIndex(url.split("/")[url.split('/').length - 2])
        console.log(props.pokemons.pokemonIndex);
        props.saveImgUrl(`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${props.pokemons.pokemonIndex}.png?raw=true`)
    }, [props.pokemons.pokemonIndex])

    // 
        
    return (
        <StyledLink to={`/PokeList/pokemon/${props.pokemons.pokemonIndex}`} >
            <div className="cards-block_card">
                <div className="cards-block_card-top">
                    <div className="cards-block_card-top_index">{props.pokemons.pokemonIndex}</div>
                    <div className="cards-block_card-top_name">{name.toLowerCase().split(' ').map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
                    .join(' ')}</div>
                </div>
                <div className="cards-block_card-bottom">
                    {imgLoading ? (
                        <img src={loading} 
                        style={{ 
                            height: '179px',
                            width: '100%'
                        }}>
                        </img>
                    ): null}
                    <Sprite 
                    className="cards-block_card-bottom_img" 
                    src={props.pokemons.imgUrl}
                    onLoad={() => setImgLoading(false)}
                    onError={() => setToManyRequests(true)}
                    style={
                        toManyRequests ? { display: "none" } :
                        imgLoading ? null : {display: "block" }
                    }
                    />
                    {toManyRequests ? (<div className="error">
                        <span className="error-text">Too many requests!</span>
                        </div>) : null}
                </div>
            </div>
        </StyledLink>
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
        savePokemonIndex: data => dispatch(savePokemonIndex(data)),
        saveImgUrl: data => dispatch(saveImgUrl(data)),
    })
)(Card)