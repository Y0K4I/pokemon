import React, { useState, useEffect } from 'react';
import './Card.css';
import Card from './Card';
import { apiGetLimited } from '../redux/apiGet';

export default function Cards_block() {
    const [limit, setLimit] = useState(30)
    const [offset, setOffset] = useState(0)
    const [pokemon, setPokemon] = useState([])

    useEffect(() => {
        apiGetLimited(limit, offset).then(result=> {
            setPokemon(result.data.results)
        })
    }, [])

    return(
        <div>
            {!!pokemon.length && console.log(pokemon)}
            {!!pokemon.length ? (<div className="cards-block">
            {pokemon.map(pokemon => (
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