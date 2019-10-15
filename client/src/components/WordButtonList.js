import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import WordButton from '../components/WordButtons';

const WordButtonList = ({ wordData, uniqueWordEndings, wordEndClickHandler, currentwordending }) => {
  console.log("Word Button List Word Data");
  console.dir(wordData); 

  // const allwordendings = extractColumn(resolve.data, "word_end");
  
  return (  
    
      <Container className="mt-3 animated slideInLeft text-center">
        <Row>
          <Col xs="12" className="mb-2 text-center " >
           
          {
            uniqueWordEndings.map((element, i) => {
              return (
                <WordButton key={i} currentwordending={element} wordData={wordData} />
              )
            }) 

          } 
          
          </Col>
        </Row>
      </Container>
  )

}

//  <WordButton key={i} currentwordending={element} />

export default WordButtonList; 