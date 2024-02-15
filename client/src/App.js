import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Create from './components/Create';
import Album from './components/Album';
import { Link } from 'react-router-dom';


function App() {
  


  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/album/:id" element={<Album />} />
      </Routes>
    </>
  );
}

export default App;
