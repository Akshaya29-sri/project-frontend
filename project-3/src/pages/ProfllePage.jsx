import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import MoodCharts from '../components/MoodCharts';
import MoodPieChart from "../components/MoodPieChart";



const ProfilePage = () => {
  const { currentUser, handleLogout } = useContext(AuthContext); // Get current user data
  const [moods, setMoods] = useState([]); // State to hold moods
  const [selectedMood, setSelectedMood] = useState(null); // State for the selected mood
  const [recommendations, setRecommendations] = useState([]); // State for recommendations
  const [moodStats, setMoodStats] = useState([]);
  const nav = useNavigate();

  // Fetch moods from MongoDB on load
  useEffect(() => {
    // Set static mood list (not from API)
  setMoods(["happy", "sad", "angry", "anxious", "romantic", "bored"]);

  /*axios
    .get(`${import.meta.env.VITE_API_URL}/mood/stats?userId=${currentUser._id}`)
    .then((res) => {
      console.log("Mood stats:", res.data);
      setMoodStats(res.data);
    })
    .catch((err) => {
      console.error("Error fetching mood stats:", err);
    });*/

    axios
    .get(`${import.meta.env.VITE_API_URL}/mood/mood-stats/${currentUser._id}`)
    .then((res) => {
      console.log("mood stats :", res.data)
      setMoodStats(res.data);
    })
    .catch((err) => console.log(err))
}, [currentUser]);
    

  // Handle mood card click
  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    
    // 1. Save mood log in the DB
    axios
    .post(`${import.meta.env.VITE_API_URL}/mood`, {
        mood: mood,
        userId: currentUser._id,
    })
    .then(() => {
    // 2. Fetch recommendations AFTER mood is saved
    return axios.get(`${import.meta.env.VITE_API_URL}/api/mood?mood=${mood}`);
    })
      .then((response) => {
        setRecommendations(response.data); // Save recommendations in state
        nav(`/recommendations/${mood}`);
      })
      .catch((error) => {
        console.log("Error logging mood or fetching recommendations:", error);
      });
  };

  if (moodStats.length === 0) {
    return <p>You did not register any moods these last days... 🕊️</p>;
  }
  
  return (
<>
<div className="top-right-links">
      <Link to="/mood/all-mood">
      <p>Check your mood history !</p>
      </Link>
      <Link to="/user-recommendation/:userId">
      <p>Check your saved recommendation!</p>
      </Link>
      </div>

      <div className="profile-page">
        <div className="main-box">
      <h2>Welcome, {currentUser?.username || 'User'}!</h2>
      <p className="feeling-question">How are you feeling today?<span>😍</span></p>



      {/* Mood Cards */}
      <div className="mood-cards">
        {Array.isArray(moods) && moods.map((mood) => (
          <div
            key={mood._id}
            className="mood-card"
            onClick={() => handleMoodClick(mood)} // Fetch recommendations for clicked mood
          >
            <div className="emoji">{getEmojiForMood(mood)}</div>
            <h3>{mood}</h3>
          </div>
        ))}
       
      </div>
      

      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
   </div>

   <div>
      <div className="mood-stats-visual">
        <MoodPieChart data={moodStats} />
        <Link to="/your-stats">
        <p>📊 Check your detailed stats</p>
        </Link>
      </div>
   </div>
   </div>
   </>
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


