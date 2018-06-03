import React, { Component } from 'react';
import './App.css';
import Txt from './textBoxP';

class App extends Component {
  render() {
    return (
      <div className="App">        
          {/* To get started, edit <code>src/App.js</code> and save to reload. */}
        <Txt placeholder="Username" img="user"/>
        <Txt placeholder="Password" img="pass" colorF="green" colorT="red"/>        
      </div>
    );
  }
}

export default App;
