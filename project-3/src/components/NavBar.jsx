import React, { useContext, useState } from "react";
import {Link} from "react-router-dom";
import logo from "../assets/home.png";
import { Menu, X } from 'lucide-react'
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
    const { currentUser, handleLogout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    };

    return(
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/">
                    <img src={logo} alt="main logo" className="logo" />
                </Link>
            </div>

            <div className="navbar-right">
                <div className="log-btn">
                    <Link to="/login">
                        <button className="login-btn">Login</button>
                    </Link>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>

                <button className="menu-toggle" onClick={toggleMenu}>
                {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

            <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                
                <li>
                    <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
                    </li>
                <li>
                    <Link to="/mood/all-mood" onClick={() => setIsOpen(false)}>Mood History</Link>
                    </li>
                <li>
                    <Link to="/favorites" onClick={() => setIsOpen(false)}>Your favorites</Link>
                </li>
                <li>
                    <Link to="/all-recommendations" onClick={() => setIsOpen(false)}>All recommendations</Link>
                </li>
                <li>
                    <Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link>
                </li>
                
      </ul>
      </div>
    </nav>
    );
}
export default NavBar;