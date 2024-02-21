import React from 'react';
import { Routes, Route, Navigate, redirect, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Create from './components/Create';
import Album from './components/Album';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from "react";


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState({status: "loggedout"});
  let redirect = useNavigate();

  function changeSearchBar(term) {
    setSearchTerm(term);
    redirect("/");
  }

  useEffect(() => {
    fetch('/api/users/myInfo')
    .then (res => res.json())
    .then ((data) => {
      setUser(data);
    })
    .catch (err => console.log(err))
  }, []);
  console.log(user);

  return (
    <>
      <Navbar changeSearchBar={changeSearchBar} user={user}/>
      <Routes>
        <Route index element={<Home searchTerm={searchTerm} />} />
        <Route path="/create" element={<Create  user={user}/>}/>
        <Route path="/album/:id" element={<Album user={user}/>}/>
      </Routes>
    </>
  );
}

export default App;
