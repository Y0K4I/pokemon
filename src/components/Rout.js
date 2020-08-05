import React, { Component } from "react";
import ReactDOM from "react-dom";

export class PokeList extends Component {
    onclick () {
      window.location.assign('http://localhost:3000/#/PokeList/');
    }

    render() {
      return (<a onClick={(e) => this.onclick(e)}><span>PokeList</span></a>);
    }
  }

export class BackButton extends Component {
    onclick () {
      window.location.assign('http://localhost:3000/');
    }

    render() {
      return (<a  onClick={(e) => this.onclick(e)}>Back</a>);
    }
  }