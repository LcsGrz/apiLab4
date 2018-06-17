// Registrar
import React, { Component } from 'react';
import TextBox from './textBoxP';
import Submit from './submit';
import './basico.css'



class Abm extends Component {
  constructor(props) {
      super(props)
      this.state = {
        username: "",
      }
  }

  getusername = (v) => {
      this.setState({username: v})
  }
  buscar = (e) =>{ 
    const { username } = this.props
    const url = 'http://127.0.0.1:420/api/usuarios'+this.state.username;
    console.log(url)
    fetch('http://127.0.0.1:420/usuarios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        
    })
        .then((response) => {
            console.log(response)
            response.json().then(function (data) {
                console.log(data)
                return data.json();
            });

        })
        .then((json) => {
            this.setState({
                usuarios:json
            })
        });
    ;
  }
  

  render() {  
    return (
        
            <div class="divredondo centerMargin sombra bordeRedondeados">  
                <TextBox type="text" placeholder="Username/Email" img="user" name="credentials.user" get={this.getusername} />
                <button onClick={this.buscar}>GGGGG</button>
                <Submit texto="Guardar" username={this.state.username} />
                <ul></ul>
            </div>
    );
  }
}

export default Abm;