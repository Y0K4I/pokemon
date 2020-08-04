import React, { Component } from 'react';
import './Header.css'
import { PokeList, BackButton } from "../Rout"

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
                        <PokeList />
                    </div>
                    <div className="header-block_search">
                        Search
                    </div>
                </div>
           </header>
        )
    }
}