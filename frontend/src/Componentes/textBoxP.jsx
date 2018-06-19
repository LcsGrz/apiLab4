import React, { Component } from 'react';
import styled from 'styled-components';
import password from '../Imagenes/password.svg';
import usuario from '../Imagenes/user.svg';

import './basico.css';

const imagen = { "user": usuario, "pass": password };

class textBoxP extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: ""
    }
  }

  onChange = (e) => {
    this.setState({value: e.target.value})
    console.log(this.state.value)
  }

  onBlur = () => {
    console.log("en hijo", this.state.value)
    this.props.get(this.state.value)
  }

  render() {
    
    const estilo = {
            
          
    };
    
    return (
      <input 
        style={estilo}
        type={this.props.type}
        class="user centerMargin bordeRedondeados"
        value={this.state.value} 
        placeholder={this.props.placeholder}
        onChange={this.onChange}
        onBlur={this.onBlur}
        required
      />
      
    );
  }
}

export default textBoxP;