import React, {useState, useEffect} from 'react'
import './Pagination.css'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

export default function Pagination({pokemonsPerPage, totalPokemons, paginate, currentPage, prevPage, nextPage}) {
    const [pageNumbers, setPageNumber] = useState([]) 
    const [totalPages, setTotalPages] = useState(totalPokemons / pokemonsPerPage)
    const maxPage = Math.floor(totalPages)

    useEffect(() => {
        if(totalPokemons) setTotalPages(totalPokemons / pokemonsPerPage)
    }, [totalPokemons])
    
    useEffect(() => {
        console.log({currentPage, totalPages, totalPokemons , pokemonsPerPage})
        if(!totalPages) return;
        setPageNumber(new Array(9).fill(currentPage).map((num, ind) => {
            const current = currentPage>5?currentPage-4+ind:ind+1
            if(current>maxPage) return;
            return current
        }))
    }, [totalPages, currentPage])

    return (
    <nav>
        <PaginationBlock>
            <Button onClick={() => {
                paginate(prevPage)
                }} disabled={currentPage === 1}>prev</Button>
            <ul className="pagination">
                {pageNumbers.length && pageNumbers.map(number => (
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

const PaginationBlock = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
`
const Button = styled.button``