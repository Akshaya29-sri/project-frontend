import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import  {AuthContext}  from "../context/AuthContext";
import { toast } from 'react-toastify';

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const nav = useNavigate();
  const { authenticateUser } = useContext(AuthContext);
  //function to send a post request to create a user in the DB
  function handleLogin(event) {
    //first is to stop the page from reloading
    event.preventDefault();
    const userToLogin = { email, password };
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, userToLogin)
      .then((res) => {
        console.log("user was logged in", res.data);
        localStorage.setItem("authToken", res.data.authToken);
        return authenticateUser();
      })
      .then(() => {
        nav("/profile");
        toast.success("Connected succesfully 😊");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.errorMessage);
        toast.error("Error connecting you...")
      });
  }

  return (
    <div className="signup-page">
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <button className="login-btn">Login</button>
      </form>
      {errorMessage ? <p className="error">{errorMessage}</p> : null}
      <p className="signup-link">
        New Here... <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};