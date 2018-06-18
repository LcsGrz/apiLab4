import React from 'react'
import {Link } from 'react-router-dom'
//var css = require('../styles');
import {MediaRight, Button,Form,FormControl,FormGroup ,ControlLabel,Col} from 'react-bootstrap';
export default class Login extends React.Component{

constructor (props){
  super(props);
}
render(){
  const wellStyles = {maxWidth: 350, margin: '0 auto 10px'};
  return(
    
          <div className="pull-right"  >
                <Form >
                  <FormGroup > 
                    <ControlLabel>Usuario</ControlLabel>
                        
                        <FormControl type='text' placeholder='USUARIO'/>

                  </FormGroup>   
                  <FormGroup > 
                    <ControlLabel>Contraseña</ControlLabel>
                        
                        <FormControl type='password' placeholder='CONTRASEÑA'/>

                  </FormGroup>    
                  <FormGroup > 
                                    
                    <Button bsStyle="info" block>INGRESAR</Button>
                  

                  </FormGroup>      
              
                  
                  
              </Form>
              <Link to={`/register`} >asdasdasd</Link>
              </div >
               
  )

}

}
