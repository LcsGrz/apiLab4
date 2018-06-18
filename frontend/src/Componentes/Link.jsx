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
    }
    registrar=() =>{
      //Aca tambien (?)
    }
    render() {
        return (
          <a onClick={this.onClick} class="links">{this.props.texto}</a>
        );
      }
}
export default Link;