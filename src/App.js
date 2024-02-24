import './App.css';

import Admin from './components/Admin/Admin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './components/Admin/Customer.css'
import Login from './components/Admin/Pages/Logggging/Login';
import React, { useEffect, useState } from 'react';
function App() {
  useEffect(() => {
    // Set the new title here
    document.title = 'Lưu Gia Admin';
  }, []);

  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/admin/login" />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/*" element={<Admin />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
