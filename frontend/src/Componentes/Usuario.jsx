import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Page from './Page';
const sideBarStyle={
    width: '25%',
    float: 'left',
    display: 'inline'
}

const contentStyle={
    width: '75%',
    float: 'right',
    display: 'inline'
}

class Usuario extends Component {

    render(){
        return (
            <Router>
            <div>
                <NavBar/>
                <div style={contentStyle}>
                    <Route path={'/home/:collection'} component={Sector} />
                    <Route exact path={'$match.url'} render={() => <h3>PP</h3>}/>
                </div>
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

const NavBar = () => (
    <div style={sideBarStyle}>
        <h2>Opciones</h2>
        <ul>
            <li>
                <Link to={ '/home/usuarios' }>Usuarios</Link>
            </li>
            <li>
                <Link to={ '/home/noticias' }>Noticias</Link>
            </li>
            <li>
                <Link to={ '/home/roles' }>Roles</Link>
            </li>
        </ul>
    </div>
  );

  const Sector = ({ match }) => (
    <div>
        <h1>{match.params.collection}</h1>
        <Page coleccion={match.params.collection}/>
    </div>
  );

export default Usuario;