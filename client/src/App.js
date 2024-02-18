import React from 'react';
import { Routes, Route, Navigate, redirect, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Create from './components/Create';
import Album from './components/Album';
import { Link } from 'react-router-dom';
import { useState } from 'react';


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  let redirect = useNavigate();

  function changeSearchBar(term) {
    setSearchTerm(term);
    redirect("/");
  }

  return (
    <>
      <Navbar changeSearchBar={changeSearchBar}/>
      <Routes>
        <Route index element={<Home searchTerm={searchTerm} />} />
        <Route path="/create" element={<Create />} />
        <Route path="/album/:id" element={<Album />} />
      </Routes>
    </>
  );
}

export default App;
