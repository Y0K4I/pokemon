import React, {useState, useEffect} from 'react'
import './Pagination.css'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { savePageNumbers, saveTotalPages } from '../redux/actions/pagination/actions';
import { createStore } from 'redux';
import paginationReducer from '../redux/reducers/paginationReducer'

const store = createStore(paginationReducer)

function Pagination({pokemonsPerPage, totalPokemons, paginate, currentPage, prevPage, nextPage, ...props}) { 
    const maxPage = Math.floor(props.pagination.totalPages)

    useEffect(() => {
        if(totalPokemons) props.saveTotalPages(totalPokemons / pokemonsPerPage)
    }, [totalPokemons, pokemonsPerPage])
    
    useEffect(() => {
        if(!props.pagination.totalPages) return;
        props.savePageNumbers(new Array(9).fill(currentPage).map((num, ind) => {
            const current = currentPage>5?currentPage-4+ind:ind+1
            if(current>maxPage) return;
            return current
        }))
    }, [props.pagination.totalPages, currentPage])


    return (
    <nav>
        <PaginationBlock>
            <Button onClick={() => {
                paginate(prevPage)
                }} disabled={currentPage === 1}>prev</Button>
            <ul className="pagination">
                {props.pagination.pageNumbers.length && props.pagination.pageNumbers.map(number => (
                    <li key={number} className="pagination-list">
                        <Link to="/PokeList" className={`pagination-list_link 
                        ${number===currentPage?'pagination-list_link-clicked':'pagination-list_link'}`} onClick={() => {
                            paginate(number)}}>{number}</Link>
                    </li>
                ))}
            </ul>
            <Button onClick={() => paginate(nextPage)}disabled={currentPage === maxPage}>next</Button>
        </PaginationBlock>
    </nav>
    )
}

export default connect(
    (state) => {
        const {pagination} = state
        return {
            pagination
        }
    },

    dispatch => ({
        savePageNumbers: data => dispatch(savePageNumbers(data)),
        saveTotalPages: data => dispatch(saveTotalPages(data))
    })
)(Pagination) 


const PaginationBlock = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
`
const Button = styled.button``