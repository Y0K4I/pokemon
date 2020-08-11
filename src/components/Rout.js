import React, { useState, useEffect } from 'react';
import axios from 'axios';

const pokemonIndex = 1;

export function PokeList() {
    const onclick = () => {
      window.location.assign('http://localhost:3000/#/PokeList/');
    }

    return (<a onClick={() => onclick()}><span>PokeList</span></a>);
  }

export function Pokedex() {
    const onclick = () => {
      window.location.assign(`http://localhost:3000/#/PokeList/pokemon/${pokemonIndex}`);
    }
    
    return (<a onClick={() => onclick()}><span>Pokedex</span></a>);
  }

