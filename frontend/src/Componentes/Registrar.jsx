// Registrar
import React, { Component } from 'react';
import TextBox from './textBoxP';
import Submit from './submit';
import './basico.css'
import logo from '../Imagenes/NUBE.png';



class formulario extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      password2: "",
      email: "",
      dni: ""
    }
  }

  getusername = (v) => {
    this.setState({ username: v })
  }

  getpassword = (v) => {
    this.setState({ password: v })
  }

  getpassword2 = (v) => {
    this.setState({ password2: v })
  }

  getemail = (v) => {
    this.setState({ email: v })
  }
  getdni = (v) => {
    this.setState({ dni: v })
  }

  render() {
    return (
      <div class="divredondo centerMargin sombra bordeRedondeados">

        <div class="centraVertical">
          <div className="Tilt-inner" >
            <img src={logo} alt="" class="centerMargin" />
            </div>
            <TextBox type="dni" placeholder="Dni" img="user" name="credentials.user" get={this.getdni} />
            <TextBox type="email" placeholder="Email" img="user" name="credentials.user" get={this.getemail} />
            <TextBox type="text" placeholder="Username" img="user" name="credentials.user" get={this.getusername} />
            <TextBox type="password" placeholder="Password" img="pass" colorF="green" colorT="red" get={this.getpassword} />
            <TextBox type="password" placeholder="Confirm Password" img="pass" colorF="green" colorT="red" get={this.getpassword2} />
            <Submit texto="Back"/>
            <Submit texto="Create Account" username={this.state.username} password={this.state.password} password2={this.state.password2} email={this.state.email} dni={this.state.dni}/>
        </div>
      </div>
    );
  }
}

export default formulario;