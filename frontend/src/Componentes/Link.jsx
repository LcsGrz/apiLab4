import React, { Component } from 'react';
import './basico.css'
class Link extends Component {

    constructor(props) {
      super(props)
      this.state = {
        value: ""
      }
    }
    render() {
        return (
          <a href={this.props.url} class="links">{this.props.texto}</a>
        );
      }
}
export default Link;