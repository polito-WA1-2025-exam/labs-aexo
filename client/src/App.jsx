// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Layout from './pages/components/Layout';
import GamePage  from './pages/GamePage';
import UserGamesPage from './pages/myGamesPages';
import MemesListPage from './pages/MemesListPage';
import MemeDetailPage from './pages/MemeDetailPage';
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
          <Route path="/memes" element={<MemesListPage />} />
          <Route path="/memes/:memeId" element={<MemeDetailPage />} />
          <Route path="/" element={<Navigate to="/game" />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
