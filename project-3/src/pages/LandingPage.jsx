import React from "react";

import { useNavigate } from "react-router-dom";

function LandingPage(){
    const navigate=useNavigate();
    return(
        <div className="landing-bg">
       
            <div className="frosted-card">
            <h1 className="glow-title">MoodFLix</h1>
            <p className="tagline">Let your mood choose the movies</p>
            <button className="shine-btn" onClick={()=>navigate('/signup')}>Sign in</button>

            <div className="feature-section">
                <h2>What's MoodFlix?</h2>
                <p>Your personal mood-bases recommendation buddy!</p>

                <div className="feature-cards">
                    <div className="feature-card">
                        <img src="../assets/camera.png" alt="Movies" />
                        <h3>Movies</h3>
                        <p>Handpicked films that match your vibe.</p>
                        </div>
                        <div className="feature-card">
                            <img src="" alt="Songs"/>
                            <h3>Songs</h3>
                            <p>Tunes to lift,soothe,or energize your mood.</p>
                            </div>
                            <div className="feature-card" >
                                <img src="" alt="Quotes"></img>
                            <h3>Quote</h3>
                            <p>Words that speak to your heart and mind.</p>
                            </div>
                            <div className="feature-card">
                                <img src="" alt="Podcasts"/>
                                <h3>Podcasts</h3>
                                <p>Voices and storie to resonate with your mood.</p>
                            </div>
                        </div>
                    </div>
                </div>

            <footer className="footer">
                <p>Made with Love by Akshaya And Jennifer</p>
                <div className="github-links">
                    <a href="">Akshaya</a>
                    <a href="">Jennifer</a>
                </div>
            </footer>
        </div>
            
    )
}
export default LandingPage;