 
import React from 'react';
import { Link } from 'react-router-dom';


const NotFoundPage = () => {
return (
<div className="notfound-container">
<h1>Wrong turn, huh?</h1>
<p>This isn't the path you're looking for... now get lost!</p>
<img
src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
alt="Get lost dance"
className="notfound-gif"
/>
<Link to="/">
<button className="go-home-btn">Take Me Home</button>
</Link>
</div>
);
};

export default NotFoundPage;