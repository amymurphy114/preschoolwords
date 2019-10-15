import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import ListWords from './components/ListWords';
import WordButtonList from './components/WordButtonList';

class Routes extends Component {
  componentDidMount(props) { 
    console.log(props);
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/listWords" component={ListWords} />
          <Route exact path="/wordButtonList" 
                  render={(props) =>
                  <WordButtonList 
                      {...props} 
                      worddata={props}
                    /> }  
                  />
        </Switch>
      </div>
    );
  }
}

export default Routes;
