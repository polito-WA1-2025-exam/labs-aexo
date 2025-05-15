import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  


  return (
    <>
      <nav className="navbar navbar-expand bg-light mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">Meme Game</Link>
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="/game">Play</Link></li>

            {!user && (
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            )}

            {user && (
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
              </li>
            )}

            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/myGames">my games</Link>
              </li>
            )}

          </ul>
        </div>
      </nav>

      <main className="container">
        {/* Render the matched child route here */}
        <Outlet />
      </main>

      <footer className="text-center mt-5 mb-3">
        <small>© 2025 Meme Game</small>
      </footer>
    </>
  );
}

export default Layout;