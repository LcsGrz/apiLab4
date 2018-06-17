import React, { Component } from 'react';
import Registrar from './Componentes/Registrar';
import Login from './Componentes/Login';
class App extends Component {
  render() {
    return (
      <Registrar /> 
      // cambiar entre login y registrar para ir probando
    );
  }
}

export default App;
