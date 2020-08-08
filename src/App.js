import React from 'react';
import './App.css';
import  Header  from './components/Header/Header';
import { Main } from './components/Main/Main';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-welcome">
          Welcome to Pokedex!
        </div>
      </div>
    )
  }
}

export default App
