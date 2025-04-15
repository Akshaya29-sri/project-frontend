// src/pages/YourStats.jsx
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { Link } from 'react-router-dom';

const UserStats = () => {
  const { currentUser } = useContext(AuthContext);
  const [moodStats, setMoodStats] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/mood/mood-stats/${currentUser._id}`)
      .then((res) => {
        console.log("user mood stats :", res.data)
        setMoodStats(res.data);
      })
      .catch((err) => console.error("Error loading mood stats", err));
  }, [currentUser]);

  return (
    <div className="user-stats-page">
      <h2>Your Mood Stats</h2>
      <Link to="/profile">← Back to Profile</Link>

      {moodStats.length === 0 ? (
        <p className="mt-4">No stats to show yet... 🕊️</p>
      ) : (
        <div>

          <div className="bar-chart-container">
            <h3 className="text-xl font-semibold mb-2">Mood Frequency (Bar Chart)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={moodStats}>
                <XAxis dataKey="_id.mood" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="line-chart-container">
            <h3>Mood Trend (Line Chart)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={moodStats}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="_id.mood" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>
      )}
    </div>
  );
};

export default UserStats;
