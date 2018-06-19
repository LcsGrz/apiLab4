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
            case 'Delete': return this.eliminar();
            case 'Update': return this.eliminar();
            case 'Accept': return this.forgot();  
            case 'Back': return this.back();
        }
    }
    back = ()=> {
        document.location.href= 'http://localhost:3000/login'; 
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
                    // localStorage.setItem('token',JSON.stringify('Authorization: Bearer '+data.token));
                    localStorage.setItem('token',data.token);
                });

            })
            .catch((error) => {
                console.error(error);
            });
        ;
    }
    registrar = () => {
        const { username, password,password2, email ,dni } = this.props
        console.log(this.props)
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
        const url = 'http://127.0.0.1:420/api/userfind';
        const tokeen = localStorage.getItem('token')
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+(tokeen)
            },
            body: JSON.stringify({               
                credentials: {
                    username}
            })            
        })
            .then((response) => {
                console.log(response)
                response.json().then(function (data) {                   
                        console.log(data)                    
                });
    
            })
        ;
    }
    eliminar = () =>{
        const { username } = this.props
        const url = 'http://127.0.0.1:420/api/userdelete';
        const tokeen = localStorage.getItem('token')
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+(tokeen)
            },
            body: JSON.stringify({               
                credentials: {
                    username
                }
            })            
        })
            .then((response) => {
                console.log(response)
                response.json().then(function (data) {                   
                        console.log(data.ok)  
                        if(data.ok>0){
                            alert("El usuario "+username+" ah sido eliminado")
                        }                  
                });
    
            })
        ;
    }
    forgot = () =>{ 
        const { username } = this.props
        console.log("Email: "+username)
        const url = 'http://127.0.0.1:420/forgot';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'                
            },
            body: JSON.stringify({               
                credentials: {
                    username
                }
            })            
        })
            .then((response) => {
                console.log(response)
                response.json().then(function (data) {       
                    console.log(data)            
                    if(data.ok>0){
                        alert("La contraseña ah sido cambiada a su DNI :v")
                        document.location.href= 'http://localhost:3000/login'; 
                    }      
                    else{
                        alert("Username/Email no encontrado")
                    }             
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