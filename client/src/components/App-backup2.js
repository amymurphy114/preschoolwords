import React, { Component } from 'react';
import '../css/custom.css';
import axios from 'axios';
import Nav from '../components/Nav';
import _ from 'underscore'; 
import { Switch, Route, withRouter } from 'react-router-dom';
import Home from '../components/Home';
import WordButtonList from '../components/WordButtonList';
import ListWords from '../components/ListWords';
import ImageList from './ImageList';

function extractColumn(arr, column) {
  return arr.map(x => x[column])
}

class App extends Component {
  constructor(props, data) {
    super(props);
    
    this.state = {
      wordData: [],
      currentwordending: "",
      uniqueWordEndings: [],
      images: [],
      wordending: "",
      wordbeginnings: [],
      currentword: "",
      currentwordbeginning: "",
      currentimage: "",
      history: [],
      consonantchoices: "",
      solved: [], 
      confettion: false
    }
    // this.handleWordBtnClick = this.handleWordBtnClick.bind(this);
    this.loadImages = this.loadImages.bind(this); 
    this.wordData = this.wordData.bind(this); 
    this.wordEndClickHandler = this.wordEndClickHandler.bind(this);
    /* this.backClickHandler = this.backClickHandler.bind(this);
    this.logoClickHandler = this.logoClickHandler.bind(this);
    this.imageClickHandler = this.imageClickHandler.bind(this);
    this.letterClickHandler = this.letterClickHandler.bind(this); */
  }

  /* CLICK HANDLERS */ 
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
  wordEndClickHandler({currentWordEnd}) { 
      console.dir(currentWordEnd);
      console.log("CLICKED WORD END ::: "+currentWordEnd)
  }

  imageClickHandler(currentimage, currentword, currentwordbeginning) {
    /* const consonantchoices = data.consonants.filter(e => e !== currentwordbeginning);
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
    ) */
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
        confettion: false
      })
  }

  logoClickHandler() {
    this.setState(
      {
        wordending: "",
        wordbeginnings: "", 
        confettion: false
      })
  }

  /* DATA LOADERS */ 
  wordData() { 
    console.log("--- APP COMPONENT LOADING DATA ---")
    axios.get("http://localhost:9000/getData")
      .then((resolve, reject) => { 

        const allwordendings = extractColumn(resolve.data, "word_end");
        const uniqueWordEndings = _.union(allwordendings, 'id');
        
        this.setState({
            wordData: resolve.data, 
            uniqueWordEndings: uniqueWordEndings
        });

              
      })
      .catch(error => { console.log("ERROR:"+error.message); })
  }
  
  loadImages(currentwordend) {
    console.log("NOW LOAD IMAGES")
    // console.log("DATA:")
    // console.dir(this.state.wordData)
    // const currentimagelist = this.state.wordData.filter((item) => item === currentwordend);
    // console.log("currnet image list:")
    // console.log(currentimagelist);
    /* console.log("IMAGES LOADING")
    //const { match: { params } } = this.state;

    console.log("WORD ENDING:"+currentwordend)
    axios.get("http://localhost:9000/getImages",
                {
                  params: {
                    word_end: currentwordend
                  }
                })
      .then((resolve, reject) => { 
        
        const allimages = extractColumn(resolve.data, "filename");
        console.log("IMAGES: "+allimages);

        this.setState({
           images: allimages,
           currentwordending: currentwordend
        });
        return allimages; 
      })
      .catch(error => { console.log("ERROR:"+error); }) */
  }
  
  componentDidMount() { 
    const { match: { params } } = this.props;
    this.wordData(); 
    //const { handle } = this.props.match.params;
    
  }
  componentDidUpdate() { 
    console.log("UPDATED COMPONENT so Current state IN APP:  ");
    console.log(this.state);

  }

  render() {
     
    return (
      <div className="App">
      <Nav currentview={this.state.view}
          backClickHandler={(currentview) => this.backClickHandler(currentview)}
          logoClickHandler={() => this.logoClickHandler()} />
          
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props}  wordData={this.wordData} /> } />
          <Route exact path="/listWords" component={ListWords} />
          <Route exact path="/wordButtonList"  
                      render={(props) => <WordButtonList 
                                        {...props}
                                        wordData={this.state.wordData} 
                                        uniqueWordEndings={this.state.uniqueWordEndings}
                                        wordEndClickHandler={(currentWordEnd) => this.wordEndClickHandler(currentWordEnd)}
                                        /> }  
        />
        <Route exact path="/words/:word_end" render={(props) => <ImageList 
                                            {...props } 
                                            wordData={this.state.wordData}
                                             />} 
        />
        </Switch>
    
      
      </div>
    );
  }
}

export default withRouter(App);
