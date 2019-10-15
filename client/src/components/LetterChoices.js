// import React, { useState, useEffect } from 'react';
import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import {shuffle} from '../Utils.js';

class LetterChoices extends Component {

constructor(props) { 
    super(props);     
    console.log("PROPSSSSS:");
    console.dir(this.props);
    //const { match: { params } } = props;
   // console.log("PARAMS:"+params);
}  

// componentDidMount() { 
//     const { match: { params } } = this.props;
//     console.log("PARAMS:"+params);
// }

render() { 
    const { currentword, currentwordbeginning, letterClickHandler, consonantchoices, updateConsonants } = this.props
    console.log("THIS HERE PROPS");
    console.dir(this.props);
   
    if(consonantchoices === undefined || consonantchoices.length === 0) { 
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

    let myclass = "";
    return (
        <Container>
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

export default LetterChoices; 