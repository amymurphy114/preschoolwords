import React from 'react';
import words from '../images/words@2x.png';
import { Link } from 'react-router-dom'
import {extractColumn, shuffle} from '../Utils'; 
import _ from 'underscore'; 

const WordButton = ({currentwordending, wordData, wordEndClickHandler } ) => { 
    
    const wordendingarray = currentwordending.split("");
    const linkname = "words/"+currentwordending; 
    let myimg = "";

    console.log("WORD DATA IN WORD BUTTON:");
    console.dir(wordData);

    if(_.isEmpty(wordData)) { 
        console.log("word data is empty");
    } else { 
    console.log("word data is not empty");
    const currentworddata = wordData.filter(element => element.word_end === currentwordending); 
    console.log(currentworddata);

    
    console.log(currentworddata);
    const imgarray = extractColumn(currentworddata, "filename");
    shuffle(imgarray); 
    myimg = "img/"+imgarray[0];
    
    console.log("MY IMG:"+myimg); 

    }
    return ( 
        
       <Link to={linkname} >
       <button className="btn btn-white border rounded shadow-sm mt-2 text-center mr-2 mr-lg-2 wordbtn hvr-underline-from-left " >
            <div className="d-inline-flex align-middle my-auto">
                <div className="bg-white border rounded p-1 mr-2 d-inline-block" id="">
                    <div className="letter d-inline ">&nbsp;&nbsp;&nbsp;</div></div>
                    { 
                        wordendingarray.map((element, i) => { 
                        return( 
                            <div key={i} className="bg-white border rounded p-2 mr-2 d-inline-block">
                                <div className="letter d-inline text-black">{element}</div>
                            </div>
                        )
                        }) 
                    } 
                </div>
                <div className="d-inline-flex align-middle mb-1 mb-md-3 ml-1">
                 
                 <div className="buttonListWords my-auto">
                    <span className="text-danger">W</span>
                    <span className="text-warning">O</span>
                    <span className="text-success">R</span>
                    <span className="text-primary">D</span>
                    <span className="text-danger">S</span>
                
                </div>

                
                <div class="d-flex imgholder align-middle " style={{backgroundImage: `url(${myimg})` }}></div>
                

                </div>
                
                
                {/* <img src={words} alt="Words" className="words mb-4 ml-2" /> */}
        </button>
        </Link>
        
    )
}



export default WordButton;