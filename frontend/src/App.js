import React, { Component } from 'react';
import Registrar from './Componentes/Registrar';
import Login from './Componentes/Login';
import Abm from './Componentes/ABMadmin';
class App extends Component {
  render() {
    return (
      <Abm /> 
      // cambiar entre login y registrar para ir probando
    );
  }
}

export default App;
