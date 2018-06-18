import React, { Component } from 'react';
import styled from 'styled-components';

import './basico.css';


class Roles extends Component {

    constructor(props) {
        super(props)
        this.state = {            
            lista: ""
        }
    }
    
    login = () =>{     
        const url = 'http://127.0.0.1:420/api/roles';
        const tokeen = localStorage.getItem('token')
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+(tokeen)
            },
    })
        .then((response) => {            
            response.json().then(function (data) {
                data.result.map((rol,index)=>{
                    console.log(rol)
                    return(
                        <li key={index}>
                            {rol}
                        </li>
                    )
            });
    
        })
    })
        .catch((error) => {
            console.error(error);
        });
    }

  render() {
      
    this.login();
    
    return (
        <ul>
            
        </ul>
      
    );
  }
}

export default Roles;