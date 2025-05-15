// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Layout from './pages/components/Layout';
import GamePage  from './pages/GamePage';
import UserGamesPage from './pages/myGamesPages';
import { AuthProvider } from './context/AuthContext';


// import GamePage  from './pages/GamePage.jsx';

export default function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/game"  element={<GamePage />} />
          <Route path="/myGames" element={<UserGamesPage />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
