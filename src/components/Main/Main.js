import React, { Component } from 'react'
import './Main.css'
import Pokemon from '../Pokemon/Pokemon'

export class Main extends Component {
    render(){
        return (
            <div className="main">
                <div className="main-block">
                    <div className="main-block_buttons">
                        <button className="main-block_buttons_button">Prev</button>
                        <button className="main-block_buttons_button">Next</button>
                    </div>
                </div>
            </div>
        )
    }
}