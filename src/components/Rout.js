import React, { Component } from "react";

const pokemonIndex = 1;

export class PokeList extends Component {
    onclick () {
      window.location.assign('http://localhost:3000/#/PokeList/');
    }

    render() {
      return (<a onClick={(e) => this.onclick(e)}><span>PokeList</span></a>);
    } 
  }

export class Pokedex extends Component {
    onclick () {
      window.location.assign(`http://localhost:3000/#/PokeList/pokemon/${pokemonIndex}`);
    }
    
    render() {
      return (<a  onClick={(e) => this.onclick(e)}><span>Pokedex</span></a>);
    }
  }
