import React from 'react';

const pokemonIndex = 1;

export function PokeList() {
    const onclick = () => {
      window.location.assign('http://localhost:3000/#/PokeList/');
    }

    return (<a onClick={() => onclick()}><span>PokeList</span></a>);
  }
