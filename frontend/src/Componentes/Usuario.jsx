import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
                    <Route path={'/:topicId'} component={Topic} />
                </div>
            </div>            
            </Router>
        );
    }
}

const NavBar = () => (
    <div style={sideBarStyle}>
        <h2>Opciones</h2>
        <ul>
            <li>
                <Link to={ '/login' }>Login</Link>
            </li>
            <li>
                <Link to={ '/register' }>Registrar</Link>
            </li>
            <li>
                <Link to={ '/admin' }>Admin</Link>
            </li>
        </ul>
    </div>
  );

  const Topic = ({ match }) => (
    <div>
        <h1>{match.params.topicId}</h1>
    </div>
  );

export default Usuario;