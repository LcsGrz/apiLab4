import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Usuario from './Componentes/Usuario';
import Registrar from './Componentes/Registrar';
import Login from './Componentes/Login';
import Forgot from './Componentes/Forgot';
import Abm from './Componentes/ABMadmin';
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route path="/register" component={Registrar} />
          <Route path="/Home" component={Home} />
          <Route path="/admin" component={Abm} />
          <Route path="/forgot" component={Forgot} />
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
    <Usuario />
  </div>
);


export default App;