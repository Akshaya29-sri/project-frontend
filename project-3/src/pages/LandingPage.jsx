import React from "react";

import { useNavigate } from "react-router-dom";

function LandingPage(){
    const navigate=useNavigate();
    return(
        <div className="landing-bg">
       
            <div className="frosted-card">
            <h1 className="glow-title">MoodFLix</h1>
            <p className="tagline">Let your mood choose the movies</p>
            <button className="shine-btn" onClick={()=>navigate('/sign-in')}>Sign in</button>
        </div>
        </div>
    )
}
export default LandingPage;