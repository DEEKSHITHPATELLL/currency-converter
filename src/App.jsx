import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Currency from "./Components/Currency"
import "./index.css";
function App() {
  return (
    <Routes>
      <Route path='/' element={<Currency/>}/>
    </Routes>
  );
}

export default App;
