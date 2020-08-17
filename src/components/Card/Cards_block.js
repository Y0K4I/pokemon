import React, { useState, useEffect } from 'react';
import './Card.css';
import Card from './Card';
import { apiGetLimited } from '../redux/apiGet';
import Pagination from '../Pagination/Pagination';
import styled, { keyframes } from 'styled-components';
import ropeEnd from './img/rope-end.png'
import ropeBody from './img/rope-body.png'

export default function Cards_block() {
    const [limit, setLimit] = useState(10)
    const [offset, setOffset] = useState(0)
    const [pokemon, setPokemon] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [allPokemons, setAllPokemons] = useState('')


    const getNewLimit = () => setLimit(limit+5)
    
    useEffect(() => {
        apiGetLimited(limit, offset).then(result => {
            setPokemon(result.data.results)
            setAllPokemons(result.data.count)
        })
        if(currentPage)
        setOffset(currentPage*limit-limit)
    }, [offset, limit, currentPage])

    const paginate = (pageNumber) =>  setCurrentPage(pageNumber)

    const nextPage = currentPage+1
    const prevPage = currentPage-1

    return(
        <div>
            <Block>
                {!!pokemon.length}
                {!!pokemon.length ? (<div className="cards-block">
                {pokemon.map(pokemon => (
                    <Card 
                        name={pokemon.name} 
                        url={pokemon.url}
                        key={pokemon.name}
                    />
                ))}
            </div>) : (<h2>Wait!</h2>)}
            <Rope>
                <RopeBody src={ropeBody}/>
                <img src={ropeEnd} alt='rope-end' style={{
                    height: '100px'
                }} onClick={() => getNewLimit()}></img>
            </Rope>
            </Block>
            <Pagination
                currentPage={currentPage}
                pokemonsPerPage={limit}
                totalPokemons = {!!allPokemons ? allPokemons : 0}
                paginate={paginate}
                nextPage={nextPage}
                prevPage={prevPage}
            />
        </div>
    );
}

const Block = styled.div`
    display: flex;
    flex-direction: row;
`
const Rope = styled.div`
    display: flex;
    flex-direction: column;
`
const RopeAnimation = keyframes`
    0% { height: 150px }
    50% { height: 300px }
    100% { height: 150p }
`

const RopeBody = styled.img`
    height: 150px;
    width: 10px;
    margin: 0px 0px 0px 15px;
    animation: ${RopeAnimation} 2s
`
