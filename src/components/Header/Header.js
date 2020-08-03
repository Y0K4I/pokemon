import React, { Component } from 'react';
import './Header.css'

export class Header extends Component {
    render() {
        return (
           <header className="header">
                <div className="header-block">
                    <div className="header-block_logo">
                        <img src="logo.jpg" alt="logo"></img>
                        <span>Pokedex</span>
                    </div>
                    <div className="header-block_nav">
                        <span>PokeList</span>
                    </div>
                    <div className="header-block_search">
                        Search
                    </div>
                </div>
           </header>
        )
    }
}