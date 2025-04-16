import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import MoodPieChart from "../components/MoodPieChart";



const ProfilePage = () => {
  const { currentUser, handleLogout } = useContext(AuthContext); // Get current user data
  const [moods, setMoods] = useState([]); // State to hold moods
  const [selectedMood, setSelectedMood] = useState(null); // State for the selected mood
  const [recommendations, setRecommendations] = useState([]); // State for recommendations
  const [moodStats, setMoodStats] = useState([]);

  const[voiceEnabled,setVoiceEnabled]=useState(true);
  const nav = useNavigate();

  // Fetch moods from MongoDB on load
  useEffect(() => {
    // Set static mood list (not from API)
  setMoods(["happy", "sad", "angry", "anxious", "romantic", "bored"]);

  axios
    .get(`${import.meta.env.VITE_API_URL}/mood/mood-stats/${currentUser._id}`)
    .then((res) => {
      console.log("Mood stats:", res.data);
      setMoodStats(res.data);
    })
    .catch((err) => {
      console.error("Error fetching mood stats:", err);
    });
  

  //load voices
  //window.speechSynthesis.getVoices();
}, [currentUser]);

const moodVoiceLines = {

  happy: [

    "You're happy? Did you win a lifetime supply of pizza?",
],

  sad: [

    "Sending you digital tissues... and snacks."

  ],

  angry: [

    "Rage detected. Time to yell into a pillow."

  ],

  bored: [

    "Bored? Just stare at the wall and pretend it’s TV.",

  ],

  anxious: [

 "Relax. Or at least pretend you're relaxed.",


  ],

  romantic: [

    "Ooooh, someone's in love! Or is it cake again?",

  ],


};
const speakMood = (mood) => {

  if (!voiceEnabled) return;
  const lines = moodVoiceLines[mood.toLowerCase()];
const message = lines
? lines[Math.floor(Math.random() * lines.length)]
: "I don't even know what to say about that mood.";
const utterance = new SpeechSynthesisUtterance(message);
// Get all available voices

  const voices = window.speechSynthesis.getVoices();
// Assign specific voices

  const voiceMap = {

    happy: "Google UK English Female",

    sad: "Google UK English Male",

    angry: "Fred",

    bored: "Google US English",

    anxious: "Samantha",

    romantic: "Victoria",

    potato: "Albert"

  };
const preferredVoice = voiceMap[mood.toLowerCase()];
  const selectedVoice = voices.find(v => v.name.includes(preferredVoice));
 if (selectedVoice) utterance.voice = selectedVoice;
utterance.pitch = 1;
 utterance.rate = 1;
speechSynthesis.speak(utterance);
};
    
  // Handle mood card click
  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    speakMood(mood)
    
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

  /*if (moodStats.length === 0) {
    return <p>You did not register any moods these last days... 🕊️</p>;
  }*/
  
  // to transform res.data (=object) to an array of objects
  const transformedData = moodStats.map(stat => ({
    name: stat._id.mood,
    value: stat.count,
  }));
  
  return (
<>
<div className="top-right-links">
      <Link to="/mood/all-mood">
      <p>Check your mood history !</p>
      </Link>
      <Link to="/user-recommendation/:userId">
    
      </Link>
      </div>

      <div className="profile-page">
        <div className="main-box">
      <h2>Welcome, {currentUser?.username || 'User'}!</h2>
      <p className="feeling-question">How are you feeling today?<span>😍</span></p>

      {/*Voice toggle*/}
      <div className="voice-toggle">
        <label>
          <input
          type="checkbox"
          checked={voiceEnabled}
          onChange={()=>setVoiceEnabled(!voiceEnabled)}/>
          {voiceEnabled?'Voice:On':'Voice:OFF'}
        </label>
      </div>




      {/* Mood Cards */}
      <div className="mood-cards">
        {Array.isArray(moods) && moods.map((mood) => (
          <div
            key={mood}
            className="mood-card"
            onClick={() => handleMoodClick(mood)} // Fetch recommendations for clicked mood
          >
            <div className="emoji">{getEmojiForMood(mood)}</div>
            <h3>{mood}</h3>
          </div>
        ))}
       
      </div>
      
   </div>

      <div className="mood-stats-visual">
        <MoodPieChart data={transformedData} />
        <Link to="/your-stats">
        <p>📊 Check your detailed stats</p>
        </Link>
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


