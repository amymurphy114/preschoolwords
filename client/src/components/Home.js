import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import { Button } from 'react-strap';
import history from "../history";

class Home extends Component {

  componentDidMount() { 
    const { match: { params } } = this.props;
  }

  render() {
    return (
      <div className="home-page mt-5 text-center rounded p-3 homeBtnHolder">
        <Link to="/register">
          <button className="btn btn-primary btn-lg text-white">
            Register
        </button>
        </Link>
        <Link to="/login">
          <button className="btn btn-success btn-lg text-white ml-2 mr-2">
            Login
        </button>
        </Link>
        <Link to="/WordButtonList" onClick={() => history.push('/')}>
          <button className="btn btn-warning btn-lg text-white"> 
            Play as Guest
        </button>
        </Link>
      </div>
    );
  }
}

export default Home;
