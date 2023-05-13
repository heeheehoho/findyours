// src/client/Root.js
// 여기서 서버 사이드 렌더링 
// 브라우저에서 사용할 최상위 class
import React from "react";
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

const Root = () => (
  <BrowserRouter>
      <App/>
  </BrowserRouter>
);

export default Root;