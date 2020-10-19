import React from 'react';
import {URL} from '../url'

const pokemonIndex = 1;

export function PokeList() {
    const onclick = () => {
      window.location.assign(URL);
    }

    return (<a onClick={() => onclick()}><span>PokeList</span></a>);
  }
