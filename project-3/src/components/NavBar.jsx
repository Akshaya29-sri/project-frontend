import React from "react";
import {Link} from "react-router-dom";

function NavBar(){
    return(
        <nav className="navbar">
            <div className="navbar-logo">MoodFLix</div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to='/profile'>Profile</Link>
            </div>
        </nav>
    );
}
export default NavBar;