import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const MoodHistoryPage = () => {
    const { currentUser } = useContext(AuthContext);

    const [moodLog, setMoodLog] = useState([]);

    useEffect(() => {
        if (!currentUser) return console.log("No current user found");

        console.log("Current User ID:", currentUser._id);

        axios
          .get(`${import.meta.env.VITE_API_URL}/mood/user/${currentUser._id}`)
          .then((res) => {
            console.log("Mood Log Response:", res.data);
            setMoodLog(res.data);
          })
          .catch((err) => {
            console.error("Error fetching mood log:", err);
          });
    }, [currentUser]);
          
  return (
    <div className="">
      <h1 className="">Your Mood Entries</h1>
      {moodLog.length === 0 ? (
  <p>No mood entries found.</p>
) : (
  <ul>
    {moodLog.map((entry) => (
      <li key={entry._id}className="mood-entry-card">
        <p><strong>Mood:</strong> {entry.mood}</p>
        <p><strong>Date:</strong> {new Date(entry.createdAt).toLocaleString()}</p>
        {entry.note && <p><strong>Note:</strong> {entry.note}</p>}
      </li>
    ))}
  </ul>
)}
    </div>
  )
}

export default MoodHistoryPage