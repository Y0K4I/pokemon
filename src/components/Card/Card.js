import React, { useState, useEffect } from 'react';
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

export default function Card({name, url}) {
    const [imgUrl, setImgUrl] = useState('')
    const [pokemonIndex, setPokemonIndex] = useState('')
    const [imgLoading, setImgLoading] = useState(true)
    const [toManyRequests, setToManyRequests] = useState(false)

    useEffect(() => {
        setPokemonIndex(url.split("/")[url.split('/').length - 2])
        setImgUrl(`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`)
    })

    // 
        
    return (
        <StyledLink to={`pokemon/${pokemonIndex}`}>
            <div className="cards-block_card">
                <div className="cards-block_card-top">
                    <div className="cards-block_card-top_index">{pokemonIndex}</div>
                    <div className="cards-block_card-top_name">{name.toLowerCase().split(' ').map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
                    .join(' ')}</div>
                </div>
                <div className="cards-block_card-bottom">
                    {imgLoading ? (
                        <img src={loading} 
                        style={{ 
                            height: '150px',
                            width: '100%'
                        }}>
                        </img>
                    ): null}
                    <Sprite 
                    className="cards-block_card-bottom_img" 
                    src={imgUrl}
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