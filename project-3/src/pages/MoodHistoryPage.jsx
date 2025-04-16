import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';


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

    //Delete Handler
    const handleDelete=async(id)=>{
      try{
        await axios.delete(`${import.meta.env.VITE_API_URL}/mood/delete/${id}`);
        setMoodLog((prev)=>prev.filter((entry)=>entry._id!==id));
        console.log("Deleted mood Id",id);
      }catch(err){
        console.log("error deleting mood entry",err);
      }

    }
          
  return (
    <div className="mood-history-container">
      <h1 >Your Mood Entries</h1>
      <Link to="/your-stats">
        <button className="detailed-stats-btn">📊 Check your detailed stats</button>
        </Link>
      {moodLog.length === 0 ? (
  <p>No mood entries found.</p>
) : (
  <ul>
    {moodLog.map((entry) => (
      <li key={entry._id}className="mood-entry-card">
        <p><strong>Mood:</strong> {entry.mood}</p>
        <p><strong>Date:</strong> {new Date(entry.createdAt).toLocaleString()}</p>
        {entry.note && <p><strong>Note:</strong> {entry.note}</p>}
        <button className="delete-button" onClick={()=>handleDelete(entry._id)}>Delete</button>
      </li>
    ))}
  </ul>
)}
    </div>
  )
}

export default MoodHistoryPage