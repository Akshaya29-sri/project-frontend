import React, { useContext } from 'react'
import { RecommendationContext } from '../context/RecommendationContext'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'



export const AllRecommendations = () => {
  const { recommendations, handleDeleteRecommendation} = useContext(RecommendationContext)
  const { currentUser} = useContext(AuthContext);

  if (!recommendations) return <p>Loading recommendations...</p>;
  
  return (
    <div className="recommendations-page">
    <Link to="/create-recommendation">
        <button className="add-recommendation-btn">Add a recommendation</button>
        </Link>
      <h2 className="recommendation-title">All our recommendations</h2>
      
      {recommendations.map((oneRecommendation) => {
        console.log("RECO:", oneRecommendation);
        //console.log("oneRecommendation.user:", oneRecommendation.user)
        //console.log("currentUser", currentUser);
        //console.log("Type of oneRecommendation.user:", typeof oneRecommendation.user);
        //console.log("Type of currentUser._id:", typeof currentUser._id);

        return (
          <div key={oneRecommendation._id} className="recommendation-card">
            <img
              src={oneRecommendation.image}
              alt={oneRecommendation.title}
            />
            <h3 className="recommendation-title">Title: {oneRecommendation.title}</h3>
            <h2 className="recommendation-creator">Creator: {oneRecommendation.creator}</h2>
            <p className="recommendation-category">Category: {oneRecommendation.category}</p>
            <p className="recommendation-description">Description: {oneRecommendation.description}</p>
            <p>Owner ID: {oneRecommendation.user?._id}</p>
            <p>Current User ID: {currentUser._id}</p>

           
            {/* Check if oneRecommendation.user exists before accessing _id */}
            {String(oneRecommendation.user?._id || oneRecommendation.user) === String(currentUser._id) && (
              
              <section>
                <Link to={`/recommendation/${oneRecommendation._id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDeleteRecommendation(oneRecommendation._id)}>
                  Delete
                </button>
              </section>
            )}
          </div>
        );
      })}
    </div>
  )
}
