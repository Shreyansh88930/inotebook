import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });

    const json = await response.json();

    if (json.success) {
      localStorage.setItem('token', json.authToken);
      props.showAlert("Login successful!", "success");
      navigate("/");
    } else {
      props.showAlert("Login failed: " + (json.error || "Unknown error"), "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-4 mt-3">
  <h2 className="mb-4">Login to continue to iNotebook</h2>
  <form onSubmit={handleSubmit}>
    <div className="form-group mb-3">
      <label htmlFor="email">Email address</label>
      <input
        type="email"
        className="form-control"
        id="email"
        name="email"
        value={credentials.email}
        onChange={onChange}
        placeholder="Enter email"
        required
      />
    </div>
    <div className="form-group mb-3">
      <label htmlFor="password">Password</label>
      <input
        type="password"
        className="form-control"
        id="password"
        name="password"
        value={credentials.password}
        onChange={onChange}
        placeholder="Password"
        required
      />
    </div>
    <button type="submit" className="btn btn-primary">Login</button>
  </form>
</div>

  );
};

export default Login;
