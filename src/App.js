import React, { Component } from 'react';
import Pusher from "pusher-js";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innstilling: 0,
      avlesning: 0,
      enhet: false,
      tilstand:"Av"
    };
  }
  componentDidMount() {
    var pusher = new Pusher('f6098b63b716985f0eda', {
      cluster: 'eu',
      encrypted: true
    });
    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', data => {
      this.setState({innstilling: data.innstilling});
      this.setState({avlesning: data.avlesning});
      if(this.state.innstilling > this.state.avlesning){
        this.setState({enhet: true});
      }else{
        this.setState({enhet: false});
      }
      if(this.state.enhet == false){
        this.setState({tilstand: "Av"});
      }else{
        this.setState({tilstand: "På"});
      }
    });
  }

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        <p>Innstilling: {this.state.innstilling}</p>
          <p>Avlesning: {this.state.avlesning} </p>
          <p>Tilstand: {this.state.tilstand}</p>
        </p>
      </div>
    );
  }
}

export default App;
