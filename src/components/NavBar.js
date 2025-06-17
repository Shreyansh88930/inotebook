import { React, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const isLoggedIn = localStorage.getItem('token');

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
        borderBottom: '2px solid #1a1a1a',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-white" to="/" style={{ fontSize: '1.5rem' }}>
          📝 iNotebook
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active text-info fw-semibold' : 'text-white'}`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? 'active text-info fw-semibold' : 'text-white'}`} to="/about">
                About
              </Link>
            </li>
          </ul>

          {!isLoggedIn ? (
            <div className="d-flex">
              <Link className="btn btn-outline-light me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-light" to="/signup">
                Sign Up
              </Link>
            </div>
          ) : (
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
