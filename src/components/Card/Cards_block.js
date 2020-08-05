import React, { Component } from 'react';
import './Card.css'
import Card from './Card'

class Cards_block extends Component {
    render() {
        return(
            <div className="cards-block">
                <Card />
            </div>
        )
    }
}

export default Cards_block