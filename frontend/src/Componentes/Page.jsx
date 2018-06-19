import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Page extends Component {
    constructor(props) {
      super(props)
      this.state = {
          col: null
      }
    }

    componentDidMount(){
        const h_autorization = 'Bearer '+ localStorage.getItem('token');
        fetch('http://127.0.0.1:420/api/pullers', {
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
            console.log(this.state.col)
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
        const col = this.state.col
        return (
          <div>
                {this.props.coleccion}
                <hr/>
                <ul>
                    { col ? (
                        col.map((item, i)=>{
                            return <li>{item.id}</li>
                        })
                    ) : (
                        <p> Loading</p>
                    )}
              </ul>
          </div>
        );
    }
}
export default Page;