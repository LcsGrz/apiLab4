import React, { Component } from 'react';
import './basico.css'
class Link extends Component {

    constructor(props) {
      super(props)
    }
    onClick = (e) =>{
      e.preventDefault();
      const options = {
        'Create Account': this.registrar(),
        'Forgot?': this.forgot(),
      }  
      return (options[this.props.url]); 
    }
    forgot=() =>{
      //Aca va lo de la ruta (?)
      fetch('http://127.0.0.1:420/forgot')
    }
    registrar=() =>{
      fetch('http://127.0.0.1:420/registrar')
    }
    render() {
        return (
          <a onClick={this.onClick} class="links">{this.props.texto}</a>
        );
      }
}
export default Link;