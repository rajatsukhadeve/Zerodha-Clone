// frontend/src/landing_page/login/Login.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });
  
  const { username, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/login",
        { ...inputValue },
        { withCredentials: true }
      );
      
      const { success, message } = data;
      if (success) {
        toast.success(message, { position: "bottom-left" });
        setTimeout(() => {
          // REDIRECT TO DASHBOARD (Change port 5173 if your dashboard is different)
          window.location.href = "http://localhost:5173/"; 
        }, 1000);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      handleError("Invalid username or password");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="p-4 border rounded shadow-sm bg-white">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  className="form-control"
                  placeholder="Enter your username"
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  className="form-control"
                  placeholder="Enter your password"
                  onChange={handleOnChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <div className="mt-3 text-center">
              <span className="text-muted">Don't have an account? </span>
              <Link to="/signup" className="text-decoration-none">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;