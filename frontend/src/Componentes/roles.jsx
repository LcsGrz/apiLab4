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
        console.log("Token : "+tokeen)
        if(tokeen===null){
            alert("no se encuentra logeado")
            return  document.location.href= 'http://localhost:3000/login'; 
        }
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
                    //Agregar lo de joa
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