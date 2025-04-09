import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import  {AuthContext}  from "../context/AuthContext";

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
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.errorMessage);
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
            placeholder="enter an email"
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
            placeholder="enter the password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <button>Login</button>
      </form>
      {errorMessage ? <p className="error">{errorMessage}</p> : null}
      <p>
        New Here... <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};