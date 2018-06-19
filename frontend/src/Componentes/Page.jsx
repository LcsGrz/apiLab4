import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Page extends Component {
    constructor(props) {
      super(props)
      this.state = {
          col: null,
          next: null
      }
    }

    crearPeticion = ()=>{
        const h_autorization = 'Bearer '+ localStorage.getItem('token');
        const peticion = 'http://127.0.0.1:420/api/' + ((this.props.coleccion === 'noticias')? 'pullers' : this.props.coleccion);
        console.log(peticion)
        fetch( peticion, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': h_autorization.toString()
            },
            body: {}
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.setState({col:data.result})
            this.setState({next:data.next})
            console.log(this.state.col)
        })
        .catch((error) => {
            console.error(error);
        });
    }

    componentDidMount(){
        this.crearPeticion();
    }

    render() {
        const col = this.state.col
        const next_page = this.state.next
        return (
            <div>
                {this.props.coleccion}
                <hr/>
                { col ? (
                        /*switch ({this.props.coleccion}) {
                            case 'usuarios':
                                return(
                                    col.map((item, i)=>{
                                        return <li>{item.user}</li>
                                    })
                                )
                                break;
                            case 'noticias':
                                col.map((item, i)=>{
                                    return <li>{item.id}</li>
                                })
                                break;
                            case 'roles':
                                col.map((item, i)=>{
                                    return <li>{'rol'}</li>
                                })
                                break;
                        
                            default:
                                break;
                        }*/
                    <ul>
                        {
                            col.map((item, i)=>{
                                return <li>{item.id}</li>
                            })
                        }
                    </ul>
                ) : (
                    <p> Loading</p>
                )}
          </div>
        );
    }
}
export default Page;