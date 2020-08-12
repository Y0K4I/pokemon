import React from 'react'
import './Pagination.css'
import { Link } from 'react-router-dom'

export default function Pagination({pokemonsPerPage, totalPokemons, paginate}) {
    const pageNumbers = []

    for(let i=1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

    debugger

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="pagination-list">
                        <Link to="/PokeList" className="pagination-list_link" onClick={() => paginate(number)}>{number}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
