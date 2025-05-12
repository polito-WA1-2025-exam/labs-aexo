// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import GamePage  from './pages/GamePage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/game"  element={<GamePage />} /> */}
        {/* <Route path="*"      element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
