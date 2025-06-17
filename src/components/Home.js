import React from 'react';
import Notes from './Notes';
import { Link } from 'react-router-dom';

const Home = (props) => {
  const { showAlert } = props;
  const isLoggedIn = localStorage.getItem("token");

  return (
    <div>
      {isLoggedIn ? (
        <Notes showAlert={showAlert} />
      ) : (
        <div className="container-fluid px-0">
          <div
            className="text-white d-flex align-items-center justify-content-center text-center"
            style={{
              minHeight: "85vh",
              background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
              color: "white",
              padding: "2rem"
            }}
          >
            <div>
              <h1 className="display-4 fw-bold mb-3">Welcome to iNotebook</h1>
              <p className="lead mb-4" style={{ maxWidth: '700px', margin: 'auto' }}>
                Your secure cloud-based notebook. Store your notes safely and access them anytime, anywhere.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Link to="/login" className="btn btn-primary btn-lg">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-outline-light btn-lg">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
