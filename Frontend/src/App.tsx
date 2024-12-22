import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Routes , Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './users/Login';
import Register from './users/Register';
import Home from './pages/Home';
import VideosList from './pages/VideosList';
import VideosPlayer from './pages/VideosPlayer';


// import Chat from './pages/Chat';

function App() {


  return (
    <div className="App bg-black text-white ">
    {/* // <div className="App bg-white"> */}

      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          {/* <Route path='/chat' element={<Chat/>}/> */}
          <Route path='/videos' element={<VideosList/>}/>
          <Route path='/videos/:category/:id' element={<VideosPlayer />} />

          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>

        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
