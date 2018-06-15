import React, { Component } from 'react';
import styled from 'styled-components';


class Submit extends Component {

    submit = (e) => {
        e.preventDefault()
        //console.log(this.props)
        const { username, password } = this.props

        fetch('http://127.0.0.1:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "credentials": {
                    "user": username,
                    password: password
                }
            })
        })
        .then((response) => {
            return response.json();
          })
          .then((json) => {
            console.log(json);
          });
    }

    render() {
        return (
            <button type="submit" onClick={this.submit}>{this.props.texto}</button>
        );
    }
}

export default Submit;