import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = credentials;

    // Client-side validation
    if (name.length < 3) {
      alert("Name must be at least 3 characters long.");
      return;
    }

    if (password.length < 5) {
      alert("Password must be at least 5 characters long.");
      return;
    }

    if (password !== cpassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const json = await response.json();

      if (response.ok && json.authToken) {
        localStorage.setItem('token', json.authToken);
        navigate("/");
        props.showAlert("Account created successfully!", "success");
      } else {
          props.showAlert("An error occurred during signup. Please try again.", "danger");
        
      }
    } catch (err) {
      props.showAlert("An unexpected error occurred. Please try again later.", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Create an account to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;
