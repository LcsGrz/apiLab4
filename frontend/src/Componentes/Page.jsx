import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Page extends Component {
    constructor(props) {
      super(props)
      this.state = {
          usuarios: null
      }
    }

    componentDidMount(){
        const aux = localStorage.getItem('token');
        const a = JSON.parse(aux);
        fetch('http://127.0.0.1:420/api/usuarios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                a
            },
            body: {}
        })
        .then((response) => {
            console.log(response)
            response.json().then((data) => {
                console.log(data.result)
                this.setState( data.result )
            })
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
          <div>
              {this.props.coleccion}
              <hr/>
              <ul>
                  { this.usuarios? (
                      this.usuarios.map((user, i)=>{
                          <li key={i}>
                          user.user
                          </li>
                      })
                  ) : (
                      <p> Loading</p>
                  )}
              </ul>
          </div>
        );
    }
}
export default Page;