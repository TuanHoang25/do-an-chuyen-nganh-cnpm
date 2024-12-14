import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../assets/css/Login.css"; // Create a CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here (e.g., API call)
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
      console.log(response.data);
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Start server ,please !");
      }
    }
  };
  const clearInput = (setter) => {
    setter("");
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1> {/* Title centered */}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email" className="login-label">
          Email
        </label>
        <div className="input-wrapper">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            placeholder="Enter your email"
            required
            value={email}
          />
          <span className="clear-icon" onClick={() => clearInput(setEmail)}>
            &times;
          </span>
        </div>

        <label htmlFor="password" className="login-label">
          Password
        </label>
        <div className="input-wrapper">
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            placeholder="Enter your password"
            required
            value={password}
          />
          <span className="clear-icon" onClick={() => clearInput(setPassword)}>
            &times;
          </span>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
