import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import App from './components/App';
import Nav from './components/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/animate.css'; 
import './css/hover.css'; 
import history from "./history";

ReactDOM.render(
  <Router history={history} >
      <Route path="/" render={(props)=> (<React.Fragment><Nav {...props} /><App {...props} /></React.Fragment>) } />
  </Router>,
  document.getElementById('root'),
);
