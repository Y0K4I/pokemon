import React, { useState, useEffect } from 'react';
import './Card.css';
import Card from './Card';
import { apiGetLimited } from '../redux/apiGet';
import Pagination from '../Pagination/Pagination';
import styled, { keyframes } from 'styled-components';
import ropeEnd from './img/rope-end.png'
import ropeBody from './img/rope-body.png'
import { connect } from 'react-redux';
import { createStore } from 'redux';
import  pokemonReducer  from '../redux/reducers/pokemonReducer';
import { savePokemons, saveAllPokemons, saveLimit, saveOffset, saveCurrentPage } from '../redux/actions/pokemons/actions';

const store = createStore(pokemonReducer)

function Cards_block(props) {
    const getNewLimit = () => props.saveLimit(props.pokemons.pokemonsLimit + 5)
     
    useEffect(() => {
        apiGetLimited(props.pokemons.pokemonsLimit, props.pokemons.pokemonsOffset).then(result => {
            if(result.data.results.length === props.pokemons.pokemonsLimit)
            props.savePokemons(result.data.results)
            props.saveAllPokemons(result.data.count) 
        })
        if(props.pokemons.pokemonsCurrentPage)
        props.saveOffset(props.pokemons.pokemonsCurrentPage*props.pokemons.pokemonsLimit-props.pokemons.pokemonsLimit)
    }, [props.pokemons.pokemonsOffset, props.pokemons.pokemonsLimit, props.pokemons.pokemonsCurrentPage])

    const paginate = (pageNumber) =>  props.saveCurrentPage(pageNumber)

    const nextPage = props.pokemons.pokemonsCurrentPage + 1
    const prevPage = props.pokemons.pokemonsCurrentPage - 1

    return(
        <div>
            <Block>
                {!!props.pokemons.pokemons.length}
                {!!props.pokemons.pokemons.length ? (<div className="cards-block">
                {props.pokemons.pokemons.map(pokemon => (
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
                currentPage={props.pokemons.pokemonsCurrentPage}
                pokemonsPerPage={props.pokemons.pokemonsLimit}
                totalPokemons = {!!props.pokemons.pokemonsCount ? props.pokemons.pokemonsCount : 0}
                paginate={paginate} 
                nextPage={nextPage}
                prevPage={prevPage}
            />
        </div>
    );
}

export default connect(
    (state) => {
        const {pokemons} = state
        return{
            pokemons
        }
    },
    dispatch => ({
        savePokemons: data => dispatch(savePokemons(data)),
        saveAllPokemons: data => dispatch(saveAllPokemons(data)),
        saveLimit: data => dispatch(saveLimit(data)),
        saveOffset: data => dispatch(saveOffset(data)),
        saveCurrentPage: data => dispatch(saveCurrentPage(data))
    })
)(Cards_block)

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
    100% { height: 150px }
`

const RopeBody = styled.img`
    height: 150px;
    width: 10px;
    margin: 0px 0px 0px 15px;
    animation: ${RopeAnimation} 2s
`
