import React, { Component } from 'react';
import styled from 'styled-components';
import TextBox from './textBoxP';
import Submit from './submit';
import Link from './Link';
import './basico.css'
import logo from '../Imagenes/NUBE.png';
import Tilt from 'react-tilt'
class formulario extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }

    getusername = (v) => {
        this.setState({ username: v })
    }

    getpassword = (v) => {
        this.setState({ password: v })
    }

    render() {
        return (
            <div class="divredondo centerMargin sombra bordeRedondeados">
                {/* <Tilt className="Tilt" options={{ max: 25 }} style={{ height: 250, width: 250 }} > */}
                    <div className="Tilt-inner" >
                     <img src={logo} alt="" class="centerMargin" /> 
                     </div>
                {/* </Tilt> * falta posicionar al cento*/}


                <TextBox type="text" placeholder="Username" img="user" name="credentials.user" get={this.getusername} />
                <TextBox type="password" placeholder="Password" img="pass" colorF="green" colorT="red" get={this.getpassword} />
                <Submit texto="Login" username={this.state.username} password={this.state.password} />
                <div class="centrado">
                    <Link url="registar" texto="REGISTRAR   " />
                    <p> / </p>
                    <Link url="url" texto="OLVIDE MI CONTRASEÑA" />
                </div>
            </div>
        );
    }
}

export default formulario;