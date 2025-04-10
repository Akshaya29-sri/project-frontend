import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ProfilePage = () => {
  const { currentUser, handleLogout } = useContext(AuthContext); // Get current user data
  const [moods, setMoods] = useState([]); // State to hold moods
  const [selectedMood, setSelectedMood] = useState(null); // State for the selected mood
  const [recommendations, setRecommendations] = useState([]); // State for recommendations
  const nav = useNavigate();

  // Fetch moods from MongoDB on load
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/mood/all-mood`)
      //console.log("Fetching moods from:", url);
      .then((response) => {
        console.log("Moods response:", response.data); // check this
        setMoods(response.data.moods); // Save fetched moods in state
      })
      .catch((error) => {
        console.log("Error fetching moods:", error);
      });
  }, []);

  // Handle mood card click
  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    // Fetch recommendations for the selected mood
    axios
        .get(`${import.meta.env.VITE_API_URL}/api/mood?mood=${mood}`)

      .then((response) => {
        setRecommendations(response.data); // Save recommendations in state
        nav(`/recommendations/${mood}`);
      })
      .catch((error) => {
        console.log("Error fetching recommendations:", error);
      });
  };

  return (
    <div className="profile-page">
      <h2>Welcome, {currentUser?.username || 'User'}!</h2>

      {/* Mood Cards */}
      <div className="mood-cards">
        {Array.isArray(moods) && moods.map((mood) => (
          <div
            key={mood._id}
            className="mood-card"
            onClick={() => handleMoodClick(mood.mood)} // Fetch recommendations for clicked mood
          >
            <div className="emoji">{getEmojiForMood(mood.mood)}</div>
            <h3>{mood.mood}</h3>
          </div>
        ))}
      </div>
       
      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

// Helper function to return the emoji for each mood
const getEmojiForMood = (mood) => {
  switch (mood) {
    case 'happy':
      return '🙂';
    case 'sad':
      return '😢';
    case 'angry':
      return '😡';
    case 'anxious':
      return '😰';
    case 'romantic':
      return '💖';
    case 'bored':
      return '😐';
    default:
      return '🙂';
  }
};

export default ProfilePage;


