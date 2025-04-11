import React from 'react'
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const RecommendationPage = () => {
    const { mood } = useParams();
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/mood?mood=${mood}`)
        .then((res) => {
            console.log("API Response:", res.data)
            setRecommendations(res.data);
            setLoading(false);
        })
        .catch((err) => {
            console.log("Error fetching recos:", err);
            setLoading(false);
        });
        }, [mood]);

        if (loading) {
            return <p>Loading recommendations...</p>; // Show loading indicator
          }


  return (
    <div className="recommendation-container">
        <Link to="/api/create-recommendation">
        <button className="add-recommendation-btn">Add a recommendation for {mood}</button>
        </Link>
        <h1 className="recommendation-title">Your mood: {mood}</h1>

        <div className="recommendation-container">
            {recommendations.map((oneReco)=> (
          <div key={oneReco._id} className="recommendation-item">
                    <img src={oneReco.image} alt={oneReco.title} className="recommendation-image" />
                    <h2 className="recommendation-title">{oneReco.title}</h2>
                    <p className="recommendation-category">{oneReco.category}</p>
                    <p className="recommendation-description">{oneReco.description}</p>
                    <a
                    href={oneReco.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                    >
                  View
                </a>
                </div>
            ))}
            </div>
     </div>

)

}

export default RecommendationPage;