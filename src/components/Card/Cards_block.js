import React, { useState, useEffect } from 'react';
import './Card.css';
import Card from './Card';
import { apiGetLimited, apiGetAll } from '../redux/apiGet';
import Pagination from '../Pagination/Pagination';

export default function Cards_block() {
    const [limit, setLimit] = useState(30)
    const [offset, setOffset] = useState(0)
    const [pokemon, setPokemon] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [allPokemons, setAllPokemons] = useState('')

    useEffect(() => {
        apiGetLimited(limit, offset).then(result=> {
            setPokemon(result.data.results)
            setAllPokemons(result.data.count)
        })
    }, [offset])

    useEffect(() => {
        if(currentPage)
        setOffset(currentPage*limit-limit)
    }, [currentPage])
    
    const paginate = (pageNumber) =>  setCurrentPage(pageNumber)
    

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
            <Pagination 
                pokemonsPerPage={limit}
                totalPokemons={allPokemons}
                paginate={paginate}
            />
        </div>
    );
}