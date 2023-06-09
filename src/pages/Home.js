import React from "react";
import tree from '../images/tree.jpg';
import main1 from '../images/main1.jpg';
import main2 from '../images/main2.jpeg';
import main3 from '../images/main3.jpeg';
import "./Home.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isScrolled: false,
    };
    this.scrollRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollRefPos = this.scrollRef.current.getBoundingClientRect().top + scrollPos;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;

    if (scrollPos >= scrollRefPos - windowHeight / 2) {
      this.setState({ isScrolled: true });
    } else {
      this.setState({ isScrolled: false });
    }
  };

  render() {
    const { isScrolled } = this.state;

    return (
      <div>
        <div className={`section ${isScrolled ? 'is-scrolled' : ''}`}>
             <h1 className="logo">Find Yours</h1>
             <div className="HomeText">
              <h1 >"당신의 소중한 가족을 여러분의 품에 안겨드리기 위해"</h1>
             </div>
          <img src={tree} alt="Tree" className="background-image" />
        </div>
        <div className="section" ref={this.scrollRef}>
          <div className="image-container">
            <div className={`image-overlay ${isScrolled ? 'active' : ''}`}>
              <img src={main1} alt="Main 1" />
              <div className="image-caption">
                <h2>실종자 모습</h2>
              </div>
            </div>
            <div className={`image-overlay ${isScrolled ? 'active' : ''}`}>
              <img src={main2} alt="Main 2" />
              <div className="image-caption">
                <h2>실시간 탐지</h2>
              </div>
            </div>
            <div className={`image-overlay ${isScrolled ? 'active' : ''}`}>
              <img src={main3} alt="Main 3" />
              <div className="image-caption">
                <h2>실종현황</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
