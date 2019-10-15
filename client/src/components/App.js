import React, { Component } from "react";
import "../css/custom.css";
import axios from "axios";
import Nav from "../components/Nav";
import _ from "underscore";
import { Switch, Route, withRouter } from "react-router-dom";
import Home from "../components/Home";
import WordButtonList from "../components/WordButtonList";
import ListWords from "../components/ListWords";
import ImageList from "./ImageList";
import SpecificWord from "./SpecificWord";
import RegisterUser from "./RegisterUser";
import {shuffle} from '../Utils'; 

function extractColumn(arr, column) {
  return arr.map(x => x[column]);
}

class App extends Component {
  constructor(props, data) {
    super(props);

    this.state = {
      view: "home",
      wordData: [],
      wordData: [],
      currentwordending: "",
      uniqueWordEndings: [],
      consonantchoices: [],
      wordending: "",
      wordbeginnings: [],
      currentword: "",
      currentwordbeginning: "",
      currentimage: "",
      solved: [],
      confettion: false
    };

    this.wordData = this.wordData.bind(this);
    this.wordEndUpdate = this.wordEndUpdate.bind(this);
    this.imageClickHandler = this.imageClickHandler.bind(this);
    this.updateConsonants = this.updateConsonants.bind(this);
  }

  /* CLICK HANDLERS */

  letterClickHandler(clickedletter, wordid, currentfirstletter) {
    console.log("CLICKED:" + clickedletter);
    console.log("word id" + wordid);
    
    if (clickedletter === currentfirstletter) {
      this.setState({
        solved: [...this.state.solved, wordid],
        consonantchoices: [],
        confettion: true
      });
    } else {
      this.setState({
        consonantchoices: this.state.consonantchoices.filter((item) => item !== clickedletter),
        confettion: false
      });
    }
  }
  
  imageClickHandler(currentwordbeginning) { 
    console.log("IMAGE CLICKED ");
    console.log(currentwordbeginning);
    const consonants = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];
    let consonantchoices = consonants.filter(e => e !== currentwordbeginning);
    shuffle(consonantchoices);
    const myconsonantchoices = consonantchoices.slice(0, 3);
    myconsonantchoices.push(currentwordbeginning);
    shuffle(myconsonantchoices);
    consonantchoices = myconsonantchoices;
    console.log("CONSONANT CHOICES: "+consonantchoices)

    this.setState({ 
      consonantchoices: consonantchoices,
      confettion: false
    })
  }

  updateConsonants(consonants) { 
    this.setState({ 
      consonantchoices: consonants,
    })
  }

  wordEndUpdate(currentwordending) {
    this.setState({
      currentwordending: currentwordending
    });
  }



  /* DATA LOADERS */

  wordData() {
    console.log("--- APP COMPONENT LOADING DATA ---");
    axios
      .get("http://localhost:9000/getData")
      .then((resolve, reject) => {
        const allwordendings = extractColumn(resolve.data, "word_end");
        const uniqueWordEndings = _.union(allwordendings, "id");

        this.setState({
          wordData: resolve.data,
          uniqueWordEndings: uniqueWordEndings
        });

      })
      .catch(error => {
        console.log("ERROR:" + error.message);
      });
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.wordData();
    //const { handle } = this.props.match.params;
  }
  componentDidUpdate() {
    console.log("UPDATED COMPONENT so Current state IN APP:  ");
    console.log(this.state);
  }

  render() {
    return (
      
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Home {...props} wordData={this.wordData} />}
          />
          <Route
            exact
            path="/wordButtonList"
            render={props => (
              <WordButtonList
                {...props}
                wordData={this.state.wordData}
                uniqueWordEndings={this.state.uniqueWordEndings}
                currentwordending={this.state.currentwordending}
              />
            )}
          />
          <Route
            exact
            path="/words/:word_end"
            render={props => (
              <ImageList
                {...props}
                wordData={this.state.wordData}
                consonantchoices={this.state.consonantchoices}
                imageClickHandler={currentwordbeginning =>
                  this.imageClickHandler(currentwordbeginning)
                }
               
              />
            )}
          />
          <Route
            exact
            path="/words/:word_end/:word_id"
            render={props => (
              <SpecificWord
                {...props}
                wordending={this.state.wordending}
                solved={this.state.solved}
                confettion={this.state.confettion}
                consonantchoices={this.state.consonantchoices}
                wordData={this.state.wordData}
                updateConsonants={consonants =>
                  this.updateConsonants(consonants)
                }
                letterClickHandler={(
                  clickedletter,
                  wordid,
                  currentfirstletter
                ) =>
                  this.letterClickHandler(
                    clickedletter,
                    wordid,
                    currentfirstletter
                  )
                }
              />
            )}
          />
          <Route
            exact
            path="/register"
            render={props => <RegisterUser {...props} />}
          />
        </Switch>
  
    );
  }
}

export default App;
