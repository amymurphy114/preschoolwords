import React, { Component } from 'react';
import logo from '../images/logo-tighter.png';
import backBtn from '../images/backbtn.png';
import {Link, useHistory} from 'react-router-dom';
// import history from "../history";


class Nav extends Component { 
  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this); // i think you are missing this
  }

  goBack(){
    this.props.history.goBack();
  
  }


  render() { 
  const { match: { params } } = this.props;
  console.log(params);
  const currentpage = params.path; 


  const renderBackBtn = () => { 
    if(currentpage !== "/" && currentpage !== "") { return (<a onClick={this.goBack}><img src={backBtn} alt="Back" className="img-fluid mr-3 mb-2 backbtn" /></a> ); }
  }
  
  return ( 
        <nav className="navbar navbar-expand-lg">
          {renderBackBtn()}
            <ul className="navbar-nav mx-auto">  
              <li className="nav-item logotext pb-2">
              <Link to="/wordButtonList" className=""> 
                  <span className="text-danger">P</span>
                  <span className="text-warning">R</span>
                  <span className="text-success">E</span>
                  <span className="text-primary">S</span>
                  <span className="text-warning">C</span>
                  <span className="text-success">H</span>
                  <span className="text-primary">O</span>
                  <span className="text-danger">O</span>
                  <span className="text-warning">L</span>

                  <span className="text-success"> W</span>
                  <span className="text-primary">O</span>
                  <span className="text-danger">R</span>
                  <span className="text-warning">D</span>
                  <span className="text-success">S</span>
              </Link>
              </li>
            </ul>
        </nav>
    )
  }
}

// export default function Nav(loc) {
//   history.push(loc);
// }

export default Nav;