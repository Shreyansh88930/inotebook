import React from 'react';

const About = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">About <span className="text-dark">iNotebook</span></h1>
        <p className="lead text-muted">Your personal cloud-powered note-taking companion.</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-10">
          <section className="mb-5">
            <h3 className="text-secondary">📌 What is iNotebook?</h3>
            <p>
              iNotebook is a full-stack MERN (MongoDB, Express.js, React, Node.js) application designed to help users store and manage their personal notes securely in the cloud. Whether you're jotting down quick ideas, daily tasks, or long-term plans, iNotebook keeps your data organized and accessible anytime, anywhere.
            </p>
          </section>

          <section className="mb-5">
            <h3 className="text-secondary">🚀 Features</h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">✔️ Secure user authentication with JWT</li>
              <li className="list-group-item">✔️ Create, read, update, and delete notes</li>
              <li className="list-group-item">✔️ Tag your notes for easy search</li>
              <li className="list-group-item">✔️ Responsive UI with Bootstrap</li>
              <li className="list-group-item">✔️ Alert system for actions and feedback</li>
            </ul>
          </section>

          <section className="mb-5">
            <h3 className="text-secondary">🛠️ Built With</h3>
            <p>
              <strong>Frontend:</strong> React.js, Bootstrap 5<br />
              <strong>Backend:</strong> Node.js, Express.js<br />
              <strong>Database:</strong> MongoDB Atlas<br />
              <strong>Authentication:</strong> JWT-based Token System
            </p>
          </section>

          <section className="mb-5">
            <h3 className="text-secondary">🔐 Security & Privacy</h3>
            <p>
              All user data is secured with authentication and authorization mechanisms. Passwords are hashed before storing and user actions are protected via token validation.
            </p>
          </section>

          <section>
            <h3 className="text-secondary">📈 Future Enhancements</h3>
            <ul>
              <li>🗂️ Note categories and folders</li>
              <li>🔍 Advanced search and filters</li>
              <li>🧠 AI-powered note suggestions</li>
              <li>📱 Mobile app support</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
