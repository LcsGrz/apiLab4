import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Usuario from './Componentes/Usuario';
import Registrar from './Componentes/Registrar';
import Login from './Componentes/Login';
import Abm from './Componentes/ABMadmin';
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          
          <Route exact path="/login" component={Login} />
          <Route path="/register" component={Registrar} />
          <Route path="/Home" component={Usuario} />
          <Route path="/admin" component={Abm} />
        </div>
      </Router>
    );
  }
}

const estilo = {
  'textAlign': 'center'
};

const Home = () => (
  <div>
    <h2 style={estilo}>React App - ApiLab4</h2>
  </div>
);


export default App;