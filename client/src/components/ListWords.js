import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar';
// import { Link } from 'react-router-dom';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import _ from 'underscore'; 



class Login extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      error: null, 
      wordlist: []
    };
  }

  getData() { 
    axios.get("http://localhost:9000/listWords")
    .then((resolve, reject) => { 
       console.dir(resolve.data);

       const firstletters = _.pluck(resolve.data, 'firstletter');

        this.setState({
          isLoading: false, 
          wordlist: resolve.data, 
          firstletters: firstletters
        })
    })
    .catch(error => { this.setState({ error, isLoading: false }) })
  }

  componentDidMount() { 
    this.getData(); 
 
  }
  componentDidUpdate() { 
    console.dir(this.state);
    console.dir(this.state.firstletters)
  }

  render() {
     const { isLoading, firstletters, error } = this.state; 
    
      return (
        
        <div>
          
          {
            !isLoading ? (
                <React.Fragment>
                  { 
                    firstletters.map((firstletter, i) =>  <li key={i}>{firstletter}</li> )
                  }
                  
                </React.Fragment>
              ) : 
            ( 
              <React.Fragment>
                  Loading
                </React.Fragment>
            )
          }
        </div>
      );
    
  }
}

export default Login;
