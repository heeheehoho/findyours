// src/components/Nav.js
import React from "react";
import { NavLink } from "react-router-dom";
import '../nav.css';

const Nav = () => {
  return (
    <nav>
      <div>
        <NavLink to="/" style={{ textDecoration: "none" }}>Home</NavLink>
      </div>
      <div>
        <NavLink to="/About" style={{ textDecoration: "none" }}>실종자 모습</NavLink>
      </div>
      <div>
        <NavLink to="/About2" style={{ textDecoration: "none" }}>실종자 실시간 탐지</NavLink>
      </div>
      <div>
        <NavLink to="/About3" style={{ textDecoration: "none" }}>실종 현황</NavLink>
      </div>
    </nav>
  );
};

export default Nav;