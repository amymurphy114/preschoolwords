import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import LetterChoices from '../components/LetterChoices';
import Confetti from 'react-confetti';
import _ from 'underscore';
import {shuffle} from '../Utils.js';
//import Confetti from 'react-dom-confetti';

var letterClass = "";
var firstletter = "";
var letterchoices = "";
var confetti = "";

class SpecificWord extends Component {

    render() {
        const { consonants, letterClickHandler, consonantchoices, solved, confettion, updateConsonants } = this.props;

        const { match: { params } } = this.props;
        const currentword = params.word_id; 
        
        let currentworddetails = this.props.wordData.filter(element => (parseInt(element.id) === parseInt(currentword)));
        
        //// Set to || '' so it won't break on initial load of specific page when there's no App data ////
        const worddetailsarray = currentworddetails[0] || ''; 
        const currentwordbeginning = worddetailsarray.firstletter || '';
        const currentimage = "../../../img/"+worddetailsarray.filename || '';
        const mywordending = worddetailsarray.word_end || '';
        const wordendingarray = mywordending.split("");

        console.log("CURRENT WORD BEGIINNING: "+currentwordbeginning)


        if((!solved.includes(currentword)) && (currentworddetails != undefined && currentworddetails.length > 0) && (consonantchoices === undefined || consonantchoices.length === 0)) { 
            const consonants = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];
            let consonantchoices = consonants.filter(e => e !== currentwordbeginning);
            shuffle(consonantchoices);
            var myconsonantchoices = consonantchoices.slice(0, 3);
            myconsonantchoices.push(currentwordbeginning);
            shuffle(myconsonantchoices);
            consonantchoices = myconsonantchoices;
            updateConsonants(myconsonantchoices);
            console.log("MY IN LC CONSONANT CHOICES: "+consonantchoices)
            
        } else { 
            var myconsonantchoices = consonantchoices; 
        }


        console.log(mywordending);  

        if (solved.includes(currentword)) {
            letterClass = "bg-success text-white border rounded p-2 p-md-3 mt-3 mr-3 d-inline-block specwordletters";
            firstletter = currentwordbeginning;
            letterchoices = "";
        } else {
            letterClass = "bg-light border rounded p-2 p-md-3 mt-3 mr-3 d-inline-block specwordletters";
            firstletter = <span> &nbsp;&nbsp;&nbsp; </span>;
            letterchoices = <LetterChoices currentword={currentword} currentwordbeginning={currentwordbeginning} consonantchoices={consonantchoices} consonants={consonants} letterClickHandler={letterClickHandler} updateConsonants={updateConsonants} />;
            //  var confetti = ""; 
        }
        if (confettion === true) {
            console.log("WIDTH: "+window.innerWidth)
            const mymargin = (window.innerWidth*15)/100;
            const mywidth = window.innerWidth-mymargin; 
            confetti = <Confetti width={mywidth} />
                
        } else {
            confetti = "";
        }
        
        let myclass = "";

        return (
            <Container>
                <Row>
                    <Col xs={{ size: 12}} lg={{size: 12}} className="bg-white shadow border mt-3 pt-5 pb-5 text-center rounded">
                        <img src={currentimage} className="img-fluid" alt="" />
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ size: 12 }} className="text-center">
                        {confetti}
                        <div className={letterClass}><div className="letter-game d-inline">{firstletter}</div></div>

                        {wordendingarray.map((element, i) => {
                            return (
                                <div key={i} className={letterClass}>
                                    <div className="letter-game d-inline">{element}</div>
                                </div>
                            )
                        })
                        }
                    </Col>
                </Row>
            
          
                <Row>
                    <Col xs={{ size: 12 }} className="mt-3 mb-5 text-center">
                        {
                            myconsonantchoices.map((e, i) => {
                                if (i % 2 !== 0) { myclass = "rotateleft" } else { myclass = "rotateright"; }
                                return (
                                    <button key={i} className={`btn btn-lg btn-white border rounded p-2 p-md-3 mt-3 mr-3 d-inline-block letterbtn ${myclass}`} onClick={() => letterClickHandler(e, currentword, currentwordbeginning)} ><div className="letter-game-choices d-inline">{e}</div></button>
                                );
                            })
                        } 
                    </Col>
                </Row>
            

            </Container>



        )

    }
}
export default SpecificWord; 