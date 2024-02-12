import Users from './components/User';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
