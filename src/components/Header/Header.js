import React, { useState, useEffect } from 'react';
import './Header.css'
import { PokeList } from "../Rout"

function Header(props) {
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
                
            </div>
        </header>
    )
}

export default Header
  