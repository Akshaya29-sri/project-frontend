import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import { toast } from "react-toastify";


const RecommendationDetailPage = () => {
    const { id } = useParams();
    const [recommendation, setRecommendation] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const{favorites,toggleFavorite}=useFavorites();
  
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
        <p><strong>Description:</strong> {recommendation.description}</p>
        
        <button onClick={() => navigate(-1)} className="back-btn">Back</button>
        
        <Link to={recommendation.url}>
            <button className="recommendation-details-btn">
                View details
            </button>
        </Link>
        <button 
          onClick={() => toggleFavorite(recommendation)} 
          className={`heart-btn ${favorites.some(fav => fav._id === recommendation._id) ? 'liked' : ''}`}
        >
          {favorites.some(fav => fav._id === recommendation._id) ? '❤️' : '🤍'}
        </button>

        {/* Check if oneRecommendation.user exists before accessing _id */}
                    {String(recommendation.user?._id || recommendation.user) === String(currentUser._id) && (
                      
                      <section>
                        <Link to={`/recommendation/update-recommendation/${recommendation._id}`}>
                          <button className="edit-btn">Edit</button>
                        </Link>
                        <button className="delete-btn" onClick={() => handleDeleteRecommendation(recommendation._id)}>
                          Delete
                        </button>
                      </section>
                    )}
        </div>
    );
  };

export default RecommendationDetailPage