import React from 'react';

const pokemonIndex = 1;

export function PokeList() {
    const onclick = () => {
      window.location.assign('https://pokedexbyalex.herokuapp.com/#/PokeList/');
    }

    return (<a onClick={() => onclick()}><span>PokeList</span></a>);
  }
