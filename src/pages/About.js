// src/pages/...
//실종자 모습 페이지

import React from "react";
import Carousel from './Carousel.jsx';
import MissingTable from './MissingTable.jsx';


class About extends React.Component {
  render () {
    return (
      <body>
      <div>
      <Carousel />     
      <br/> 
      <br/>   

      <h2 className="PoliceAPI">경찰청 실종자 정보</h2>
      <MissingTable />

      </div>   
      </body>
    )
  }
}

export default About;