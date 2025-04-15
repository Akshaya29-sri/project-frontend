import React from "react";
import {Link} from "react-router-dom";
import logo from "../assets/home.png";

function NavBar(){
    return(
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/">
                <img src={logo} alt="main logo"className="logo"></img></Link>
            </div>
            <div className="navbar-right">
                <Link to ="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/all-recommendations">All our recommendations</Link>
                <Link to="/about">AboutUs</Link>
            </div>
        </nav>
    );
}
export default NavBar;