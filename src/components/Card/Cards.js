import React, { Component } from 'react';
import './Card.css'
import Cards_block from './Cards_block'

class Cards extends Component {
    render() {
        return (
            <div className="cards">
                <Cards_block />
            </div>
        )
    }
}

export default Cards