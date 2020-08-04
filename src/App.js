import React from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { PokeList, BackButton } from "./components/Rout"

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Main />
      </div>
    )
  }
}

export default App
