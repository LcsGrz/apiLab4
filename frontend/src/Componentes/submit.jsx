import React, { Component } from 'react';
import styled from 'styled-components';
import './basico.css'

class Submit extends Component {
    submit = (e) => {
        e.preventDefault()
           
        switch(this.props.texto){
            case 'Create Account': return this.registrar();
            case 'Login': return this.login();
            case 'Find': return this.buscar();
        }
    }
    login = () =>{      
        const { username, password } = this.props
        fetch('http://127.0.0.1:420/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                credentials: {
                    username,
                    password
                }
            })
        })
            .then((response) => {
                response.json().then(function (data) {
                    console.log("Al token Perro: "+data.token);
                    localStorage.setItem('token',JSON.stringify('Authorization: Bearer '+data.token+'}'));
                });

            })
            .catch((error) => {
                console.error(error);
            });
        ;
    }
    registrar = () => {
        const { username, password,password2, email ,dni } = this.props
        if(password !== password2){
            alert("Las contraseñas no coinciden")
            return ;
        }
        fetch('http://127.0.0.1:420/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                credentials: {
                    username,
                    password,
                    email,
                    dni
                }
            })
        })
            .then((response) => {
                response.json().then(function (data) {
                    console.log(data.token);
                    // this.setState({token: data.token})
                });

            })
            .catch((error) => {
                console.error(error);
            });
        ;
    }
    buscar = () =>{ 
        const { username } = this.props
        const url = 'http://127.0.0.1:420/usuarios?q={"username":"'+username+'"}';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            
        })
            .then((response) => {
                response.json().then(function (data) {
                    data.result.map((x)=>{
                        console.log(x)
                    })
                });
    
            })
        ;
      }
    render() {
        return (
            <button type="submit" class="boton centerMargin bordeRedondeados" onClick={this.submit}>{this.props.texto}</button>
        );
    }
}

export default Submit;