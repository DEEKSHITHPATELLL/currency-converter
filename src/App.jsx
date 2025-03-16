import React from 'react';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Currency from "./Components/Currency"
import "./index.css";
function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Currency/>}/>
      </Routes>
      </Router>     
  );
}

export default App;
