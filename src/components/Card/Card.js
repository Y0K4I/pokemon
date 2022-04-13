import React, { useState, useEffect } from 'react';
import './Card.css';
import styled from 'styled-components';
import loading from './loading.gif';
import { Link } from 'react-router-dom'
import {URL} from '../../url'

const Sprite = styled.img`
    width: 150px;
    height: 150px;
    display: none;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
`;

function Card({name, url, index, ...props}) {
    const [imgUrl, setImgUrl] = useState('')
    const [imgLoading, setImgLoading] = useState(true)
    const [toManyRequests, setToManyRequests] = useState(false)

    useEffect(() => {
        setImgUrl(`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${index}.png?raw=true`)
    }, [index])
        
    return (
        <StyledLink to={`PokeList/pokemon/${index}`}>
            <div className="cards-block_card">
                <div className="cards-block_card-top">
                    <div className="cards-block_card-top_index">{index}</div>
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

export default Card
