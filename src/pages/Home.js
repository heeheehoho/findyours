import React from "react";
import tree from '../images/tree.jpg';
import intro from '../images/slide1.png';

class Home extends React.Component {
  render () {
    return (          
      <body className="homebody">
      <h1 className='logo'>Find Yours</h1>
      <img id="backimg" src={tree} alt="tree" />
      <img src={intro} alt="introduce" />
    </body>     
    )
  }
}

export default Home;
