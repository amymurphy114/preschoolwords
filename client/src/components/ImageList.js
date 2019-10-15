import React, { Component } from 'react';
import {Link} from 'react-router-dom'; 

class ImageList extends Component {
  constructor(props, data) {
    super(props);
  }

  

  render() {
    const { match: { params } } = this.props;
    const {imageClickHandler} = this.props; 
    const currentimages = this.props.wordData.filter((element, i) => element.word_end === params.word_end); 
    let btnClass=""; 

    return (
        <div className="container">
          
        <div className="row text-center">
          <div className="col-12 bg-danger shadow rounded mt-3 mb-3"><h1 className="mt-2 text-white vag">-{params.word_end} WORDS</h1></div>
         </div>
         <div className="card-columns">
          {
            currentimages.map((element, i) => {
                const imgName = "../../img/"+element.filename;
                btnClass = "btn btn-white animated zoomIn mb-3 hvr-float-shadow imageBtnHolder";
                const linkname = "../words/"+params.word_end+"/"+element.id; 
                console.log("first letter:"+element.firstletter); 

                return (                   
                      <Link to={linkname} >
                      <button key={i} type="button" className={btnClass} onClick={imageClickHandler.bind(this, element.firstletter)} >
                        <div className="card-body">
                           
                          <img src={imgName} className="card-img-top img-fluid imginbtn" alt={`-`+params.word_end+` word`} />
                          
                        </div>
                      </button> 
                      </Link>
                  );
            })
          }
          </div>
          </div>
    )
  }
}


export default ImageList; 