import React from 'react';

import aboutImage from '../assets/about.jpg'; // make sure to put your image in src/assets

const AboutPage = () => {
return (
<div className="about-wrapper">
<div className="about-image-section">
<img src={aboutImage} alt="About Us" className="about-image" />
</div>

<div className="about-text-section">
<h2 className="about-heading">Meet the MoodFlix Makers!</h2>
<p className="about-highlight">
Hey there! We’re <span className="name">Akshaya</span> & <span className="name">Jennifer</span> — the dream team behind <span className="moodflix">MoodFlix</span>!
</p>
<p>
Whether you're hyped, low-key, or vibing in between, MoodFlix is here to match your mood with the perfect movie (and more).
</p>
<p>
With heart, hustle, and a splash of magic, we built this app to turn emotions into experiences.
</p>
<p className="final-line">
Thanks for stopping by! We hope MoodFlix adds a little joy to your day.
</p>
</div>
</div>
);
};

export default AboutPage;
