import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Routes , Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './users/Login';
import Register from './users/Register';
import Home from './pages/Home';

function App() {


  return (
    <div className="App bg-[#1B1833] ">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>

          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>

        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
