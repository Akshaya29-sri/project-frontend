import React from "react";
import cameraIcon from '../assets/camera.png';
import microphoneIcon from "../assets/microphone.png";
import quoteIcon from "../assets/quote.png";
import spotifyIcon from "../assets/spotify.png";
import pictureLogo from "../assets/logo.jpg";
import githubIcon from "../assets/github.png";

import { useNavigate } from "react-router-dom";

function LandingPage(){
    const navigate=useNavigate();
    return(
        <div className="landing-bg">
       
            <div className="frosted-card">
                <div className="logo-container">
            <img src={pictureLogo} alt="MoodFlix" className="main-logo"></img>
            <button className="shine-btn" onClick={()=>navigate('/signup')}>Sign in</button>
            </div>

            <div className="feature-section">
                <h2>What's MoodFlix?</h2>
                <p>Your personal mood-based recommendation buddy!</p>

                <div className="feature-cards">
                    <div className="feature-card">
                        <img src={cameraIcon} alt="Movies" />
                        <h3>Movies</h3>
                        <p>Handpicked films that match your vibe.</p>
                        </div>
                        <div className="feature-card">
                            <img src={microphoneIcon} alt="Songs"/>
                            <h3>Songs</h3>
                            <p>Tunes to lift,soothe,or energize your mood.</p>
                            </div>
                            <div className="feature-card" >
                                <img src={quoteIcon} alt="Quotes"></img>
                            <h3>Quote</h3>
                            <p>Words that speak to your heart and mind.</p>
                            </div>
                            <div className="feature-card">
                                <img src={spotifyIcon} alt="Podcasts"/>
                                <h3>Podcasts</h3>
                                <p>Voices and stories to reasonate with your mood.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="footer">
<p>Made with Love by Akshaya and Jennifer</p>
<div className="github-links">
<a href="https://github.com/Akshaya29-sri" target="_blank" rel="noopener noreferrer">
<img src={githubIcon} alt="GitHub" className="github-icon" /> Akshaya
</a>
<a href="https://github.com/refinejcode49" target="_blank" rel="noopener noreferrer">
<img src={githubIcon} alt="GitHub" className="github-icon" /> Jennifer
</a>
</div>
</footer>
        </div>
            
    )
}
export default LandingPage;