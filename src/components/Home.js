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
        <>
          {/* Hero Section */}
          <div className="container-fluid px-0">
            <div
              className="text-white d-flex align-items-center justify-content-center text-center"
              style={{
                minHeight: "85vh",
                background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
                padding: "2rem"
              }}
            >
              <div>
                <img
                  src=".\image.png"
                  alt="Welcome Illustration"
                  style={{ width: '300px', marginBottom: '30px' }}
                />
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

          {/* Features Section */}
          <div className="container my-5">
            <h2 className="text-center mb-4">Why Use iNotebook?</h2>
            <div className="row text-center">
              <div className="col-md-4 mb-4">
                <i className="fa-solid fa-lock fa-2x mb-3 text-primary"></i>
                <h5>Secure</h5>
                <p>Your notes are encrypted and stored securely in the cloud.</p>
              </div>
              <div className="col-md-4 mb-4">
                <i className="fa-solid fa-cloud fa-2x mb-3 text-success"></i>
                <h5>Accessible</h5>
                <p>Access your notes anytime, from any device with seamless sync.</p>
              </div>
              <div className="col-md-4 mb-4">
                <i className="fa-solid fa-rocket fa-2x mb-3 text-warning"></i>
                <h5>Fast & Easy</h5>
                <p>Quickly add, update, and manage notes with a smooth UI.</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
