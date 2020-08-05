import React, { Component } from 'react';
import Header from '../Header/Header'
import Cards from '../Card/Cards'

class Poke_list extends Component {
    render() {
        return (
        <div className="app">
           <Header />
           <Cards />
        </div>
        )
    }
}

export default Poke_list