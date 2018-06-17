import React, { Component } from 'react';
import styled from 'styled-components';
import './basico.css'

class Submit extends Component {

    submit = (e) => {
        e.preventDefault()
        console.log(this.props.password2)
        if (this.props.password2 === undefined) {
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
                        console.log(data.token);
                        // this.setState({token: data.token})
                    });

                })
                .catch((error) => {
                    console.error(error);
                });
            ;
        }
        else{
            this.registrar();
        }
    }
    registrar = () => {
        const { username, password, email } = this.props
        console.log(this.props)
        fetch('http://127.0.0.1:420/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                credentials: {
                    username,
                    password,
                    email
                }
            })
        })
            .then((response) => {
                console.log("pase por aqui")
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
    render() {
        return (
            <button type="submit" class="boton centerMargin bordeRedondeados" onClick={this.submit}>{this.props.texto}</button>
        );
    }
}

export default Submit;