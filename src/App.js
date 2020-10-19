import React, {useEffect} from 'react';
import './App.css';
import  Header  from './components/Header/Header';
import axios from 'axios';

function App() {

  return (
    <div className="app">
      <Header />
      <div className="app-welcome">
        Welcome to Pokedex!
      </div>
    </div>
  )
}

export default App
 