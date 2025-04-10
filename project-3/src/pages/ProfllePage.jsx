import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';


const ProfilePage = () => {
  const { currentUser, handleLogout } = useContext(AuthContext); // Get current user data
  const [moods, setMoods] = useState([]); // State to hold moods
  const [selectedMood, setSelectedMood] = useState(null); // State for the selected mood
  const [recommendations, setRecommendations] = useState([]); // State for recommendations

  // Fetch moods from MongoDB on load
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/mood/all-mood`)
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

      {/* Recommendations */}
      {selectedMood && recommendations.length > 0 && (
        <div className="recommendations">
          <h4>Recommendations for {selectedMood}</h4>
          <ul>
  <li><strong>Movies:</strong> {Array.isArray(recommendations?.movies) ? recommendations.movies.join(', ') : 'N/A'}</li>
  <li><strong>Songs:</strong> {Array.isArray(recommendations?.songs) ? recommendations.songs.join(', ') : 'N/A'}</li>
  <li><strong>Books:</strong> {Array.isArray(recommendations?.books) ? recommendations.books.join(', ') : 'N/A'}</li>
  <li><strong>Quotes:</strong> {Array.isArray(recommendations?.quotes) ? recommendations.quotes.join(', ') : 'N/A'}</li>
  <li><strong>Podcast:</strong> {Array.isArray(recommendations?.podcast) ? recommendations.podcast.join(', ') : 'N/A'}</li>
</ul>
        </div>
      )}

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


