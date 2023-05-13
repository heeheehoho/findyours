import React from 'react';
import { Routes, Route,BrowserRouter} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import About2 from './pages/About2';
import About3 from './pages/About3';
import Nav from './components/Nav';

class App extends React.Component {
  render() {
  return (
  <body className='appbody'>
      <div className='App'>
        <BrowserRouter>
           <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About/>} />
            <Route path="/about2" element={<About2 />} />
            <Route path="/about3" element={<About3 />} />
          </Routes>
        <Nav />
        </BrowserRouter>
    </div>
    </body>
  );
  }
}

export default App;