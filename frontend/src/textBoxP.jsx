import React, { Component } from 'react';
import styled from 'styled-components';

import password from './Imagenes/password.svg';
import usuario from './Imagenes/user.svg';

const imagen = { "user": usuario, "pass": password };

class textBoxP extends Component {

  render() {
    const Input = styled.input`
    background: url(${imagen[this.props.img]}) left no-repeat;
    background-size: 25px 25px;
    background-color:${this.props.colorF};
    height:30px;
    color: ${color => this.props.colorT};
    font:20px Ms Sans Serif;
    padding-left: 25px;
    width: 35 px;
    border: 1px solid gray;
    `;
    return (
      <Input placeholder={this.props.placeholder}></Input>
    );
  }
}

export default textBoxP;