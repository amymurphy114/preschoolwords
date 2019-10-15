import React from 'react';
import '../css/App.css';
import '../css/custom.css';

import Nav from '../components/Nav';
import WordButtonList from '../components/WordButtonList';
import ImageList from '../components/imageList';
import SpecificWord from '../components/SpecificWord';
import axios from 'axios'; 

// import { DndProvider } from 'react-dnd'
// import HTML5B  ackend from 'react-dnd-html5-backend'



const data = {
  "worddata": { "1": "AT", "2": "AR", "3": "AB" },
  "words": {
    "1": { "1": "C", "2": "B", "3": "H", "5": "R" },
    "2": { "6": "B", "7": "C", "8": "J", "9": "ST" },
    "3": { "10": "C", "11": "CR", "12": "GR", "13": "L" }
  },
  "images": {
    "1": ["cat.png", "cat2.png"],
    "2": ["bat.png", "cat2.png"],
    "3": ["hat.png", "cat2.png"],
    "5": ["rat.png", "cat2.png"],
    "6": ["bar.png", "cat2.png"],
    "7": ["car.png", "cat2.png"],
    "8": ["jar.png", "cat2.png"],
    "9": ["star.png", "cat2.png"],
    "10": ["cab.png", "cat2.png"],
    "11": ["crab.png", "cat2.png"], 
    "12": ["grab.png", "cat2.png"],
    "13": ["lab.png", "cat2.png"]
  },
  "consonants": ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"],
};

const mywordendingkeys = Object.keys(data.worddata);
const mywordendingvalues = Object.values(data.worddata);

var shuffle = (array) => {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    if (array.includes(index) === false) {
      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;

    }
  }
  return array;
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      view: "home",
      wordending: "",
      wordendingcat: "",
      wordbeginnings: [],
      currentword: "",
      currentwordbeginning: "",
      currentimage: "",
      history: [],
      consonantchoices: "",
      solved: [], 
      confettion: false
    }
    this.handleWordBtnClick = this.handleWordBtnClick.bind(this);
    this.backClickHandler = this.backClickHandler.bind(this);
    this.logoClickHandler = this.logoClickHandler.bind(this);
    this.imageClickHandler = this.imageClickHandler.bind(this);
    this.letterClickHandler = this.letterClickHandler.bind(this);
  }

  handleWordBtnClick(currentwordending, currentwordendingcat) {
    this.setState(
      {
        view: "imagelist",
        wordending: currentwordending,
        wordendingcat: currentwordendingcat,
        wordbeginnings: data["words"][currentwordendingcat]
      }
    )
  }
  letterClickHandler(clickedletter, wordid) {
    if (clickedletter === this.state.currentwordbeginning) {
      this.setState({
        solved: [...this.state.solved, wordid],
        consonantchoices: [], 
        confettion: true
      })
    } else {
      this.setState(
        {
          consonantchoices: this.state.consonantchoices.filter((item) => item !== clickedletter),
          confettion: false
        }
      )
    }
  }

  imageClickHandler(currentimage, currentword, currentwordbeginning) {
    const consonantchoices = data.consonants.filter(e => e !== currentwordbeginning);
    shuffle(consonantchoices);
    const myconsonantchoice = consonantchoices.slice(0, 3);
    myconsonantchoice.push(currentwordbeginning);
    shuffle(myconsonantchoice);
   
   
    this.setState(
      {
        view: "specificword",
        currentimage: currentimage,
        currentword: currentword,
        currentwordbeginning: currentwordbeginning,
        consonantchoices: myconsonantchoice, 
        confettion: false
      }
    )
  }
  
  backClickHandler(currentview) {
    var newview = ""; 
    if(currentview === "specificword") { 
       newview = "imagelist"; 
    } else { 
       newview = "home"; 
    }
    this.setState(
      {
        view: newview,
        confettion: false
      })
  }

  logoClickHandler() {
    this.setState(
      {
        view: "preview",
        wordending: "",
        wordendingcat: "",
        wordbeginnings: "", 
        confettion: false
      })
  }

  componentDidUpdate() {
    console.log(this.state);
  }



  renderView() {
    const myids = Object.keys(this.state.wordbeginnings);
    //const myletters = Object.values(this.state.wordbeginnings);

    switch (this.state.view) {
      case "preview": {
        return (
          <div>
            Choose your game or something
            </div>
        )
      }
      case "home": {
        return (
          <WordButtonList mywordendingkeys={mywordendingkeys}
            mywordendingvalues={mywordendingvalues}
            handleWordBtnClick={(currentwordending, currentwordendingcat) => this.handleWordBtnClick(currentwordending, currentwordendingcat)}
          />


        );
      }

      case "imagelist": {
        return (
          <ImageList myids={myids}
            images={data["images"]}
            wordending={this.state.wordending}
            wordbeginnings={this.state.wordbeginnings}
            solved={this.state.solved}
            imageClickHandler={(currentimage, currentword, currentwordbeginning) => this.imageClickHandler(currentimage, currentword, currentwordbeginning)}
          />
        )
      }

      case "specificword": {
        return (
          <SpecificWord
            wordending={this.state.wordending}
            currentimage={this.state.currentimage}
            currentword={this.state.currentword}
            consonants={data.consonants}
            consonantchoices={this.state.consonantchoices}
            currentwordbeginning={this.state.currentwordbeginning}
            solved={this.state.solved}
            confettion={this.state.confettion}
            letterClickHandler={(clickedletter, wordid) => this.letterClickHandler(clickedletter, wordid)}

          />

        )
      }

      default: {
        return null;
      }
    }
  }



  render() {

    return (
      <div className="App">
        <Nav currentview={this.state.view}
          backClickHandler={(currentview) => this.backClickHandler(currentview)}
          logoClickHandler={() => this.logoClickHandler()} />
         
        {this.renderView()}
        
      </div>

    )
  }
}


export default App;