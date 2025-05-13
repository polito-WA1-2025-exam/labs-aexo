// src/App.jsx
import React , { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Layout from './pages/components/Layout';
import GamePage  from './pages/GamePage';
import UserGamesPage from './pages/myGamesPages';

// import GamePage  from './pages/GamePage.jsx';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        {/* All these routes share the same Layout */}
        <Route element={<Layout user={user} setUser={setUser} />}>
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/game"  element={<GamePage  user={user}/>} />
          <Route path="/myGames" element={<UserGamesPage user={user} />} />
        </Route>
        {/* Fallback for 404s could go here */}
      </Routes>
    </BrowserRouter>

  );
}
