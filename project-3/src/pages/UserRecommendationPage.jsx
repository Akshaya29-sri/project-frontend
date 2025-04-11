import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UserRecommendationPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [avoided, setAvoided] = useState([]);
  
    useEffect(() => {
      // Récupérer les recommandations favorites et évitées de l'utilisateur
      axios
        .get(`${import.meta.env.VITE_API_URL}/user-recommendations/${userId}`)
        .then((response) => {
          const { favorites, avoided } = response.data;
          setFavorites(favorites);
          setAvoided(avoided);
        })
        .catch((error) => {
          console.log('Error fetching user recommendations:', error);
        });
    }, [userId]);
  
    return (
      <div>
        <h1>Your Recommendations</h1>
        
        {/* Section for the favorited recommanded */}
        <h2>Favorites</h2>
        <div>
          {favorites.map((recommendation) => (
            <div key={recommendation._id}>
              <h3>{recommendation.title}</h3>
              <p>{recommendation.description}</p>
              <button onClick={() => handleRemoveRecommendation(recommendation._id)}>Remove from Favorites</button>
            </div>
          ))}
        </div>
        
        {/* Section for the avoided recommendation */}
        <h2>Avoided</h2>
        <div>
          {avoided.map((recommendation) => (
            <div key={recommendation._id}>
              <h3>{recommendation.title}</h3>
              <p>{recommendation.description}</p>
              <button onClick={() => handleRemoveRecommendation(recommendation._id)}>Remove from Avoided</button>
            </div>
          ))}
        </div>
      </div>
    );
  
    // Function to handle the removal of a recommendation
    const handleRemoveRecommendation = (recId) => {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/user-recommendations/remove/${recId}`)
        .then(() => {
          // After successful deletion, refresh the list of recommendations
          setFavorites(favorites.filter((rec) => rec._id !== recId));
          setAvoided(avoided.filter((rec) => rec._id !== recId));
        })
        .catch((error) => {
          console.log('Error removing recommendation:', error);
        });
    };
  };

export default UserRecommendationPage