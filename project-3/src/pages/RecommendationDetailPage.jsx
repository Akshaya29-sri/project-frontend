import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const RecommendationDetailPage = () => {
    const { id } = useParams();
    const [recommendation, setRecommendation] = useState(null);
    const { currentUser } = useContext(AuthContext);
  
    useEffect(() => {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/recommendation/${id}`)
        .then((res) => {
          setRecommendation(res.data);
        })
        .catch((err) => console.error(err));
    }, [id]);
  
    if (!recommendation) return <p>Loading...</p>;
  
    const isOwner = recommendation.user && recommendation.user._id === currentUser._id;
  
    return (
    
        <div className="recommendation-detail-page">
        <h2 className="recommendation-title" >{recommendation.title}</h2>
        <img src={recommendation.image} alt={recommendation.title} style={{ maxWidth: "300px" }}/>
        <p><strong>Creator:</strong> {recommendation.creator}</p>
        <p><strong>Category:</strong> {recommendation.category}</p>
        <p><strong>Mood:</strong> {recommendation.mood}</p>
        <p><strong>Description:</strong> {recommendation.description}</p>
        <Link to="">
            <button>Back</button>
        </Link>

        {isOwner && (
          <div className="recommendation-actions">
            <Link to={`/recommendation/${recommendation._id}/edit`}>
              <button>Edit</button>
            </Link>
          </div>
        )}
        </div>
    );
  };

export default RecommendationDetailPage