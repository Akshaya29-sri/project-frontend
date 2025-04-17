import React, { useContext, useState } from 'react'
import { RecommendationContext } from '../context/RecommendationContext'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'


export const AllRecommendations = () => {
  const { recommendations, handleDeleteRecommendation} = useContext(RecommendationContext)
  const { currentUser} = useContext(AuthContext);

  const [searchTerm,setSearchTerm]= useState('');
  const[showOnlyFavorites,setShowOnlyFavorites]=useState(false);
  const[suggestions,setSuggestions]=useState([]);

  const allCategories=['movie','song','quote','book','podcast'];
  
  const{favorites,toggleFavorite}=useFavorites();

  const handleInputChange=(e)=>{
    const value=e.target.value;
    setSearchTerm(value);

    const filteredSuggestions=allCategories.filter((cat)=>
        cat.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick=(category)=>{
    setSearchTerm(category);
    setSuggestions([]);
  }

  if (!recommendations) return <p>Loading recommendations...</p>;
  
  return (
    <div className="recommendations-page">
        <Link to="/create-recommendation">
          <button className="add-recommendation-btn">Add a recommendation</button>
        </Link>

        <button onClick={()=>navigate('/favorites')} className="view-fav-btn">View Favourites</button>

 {/*Search bar*/}
 <div className="search-bar-wrapper2">
            <input 
            type="text"
            placeholder="Search by category"
            value={searchTerm}
            onChange={handleInputChange}
            className="search-bar"/>

            {suggestions.length >0 &&(
                <ul className="suggestions-list">
                    {suggestions.map((suggestion)=>(
                        <li key={suggestion}
                        onClick={()=>handleSuggestionClick(suggestion)}
                        className="suggestion-item"
                        >{suggestion}</li>
                    ))}
                </ul>
            )}
        </div>

      <h2 className="recommendation-title">All our recommendations</h2>
      
      {recommendations.map((oneRecommendation) => {
        //console.log("RECO:", oneRecommendation);
        //console.log("oneRecommendation.user:", oneRecommendation.user)
        //console.log("currentUser", currentUser);
        //console.log("Type of oneRecommendation.user:", typeof oneRecommendation.user);
        //console.log("Type of currentUser._id:", typeof currentUser._id);

        return (
          <div key={oneRecommendation._id} className="recommendation-card">
            <img
              src={oneRecommendation.image}
              alt={oneRecommendation.title}
              className="recommendation-image"
            />
            <h3 className="recommendation-title">Title: {oneRecommendation.title}</h3>
            <h2 className="recommendation-creator">Creator: {oneRecommendation.creator}</h2>
            <p className="recommendation-category">Category: {oneRecommendation.category}</p>
            <p className="recommendation-description">Description :{oneRecommendation.description.split(" ").slice(0, 20).join(" ")}...
            </p>
            <Link to={`/recommendation/${oneRecommendation._id}`}>
            <button className="recommendation-details-btn">View details</button>
            </Link>
            <button onClick={()=>toggleFavorite(oneReco)} 
                className={`heart-btn ${favorites.some(fav=>fav._id===oneRecommendation._id)?'liked':''}`}>
                    {favorites.some(fav=>fav._id===oneRecommendation._id)?'❤️':'🤍'}
            </button>
           
            {/* Check if oneRecommendation.user exists before accessing _id */}
            {String(oneRecommendation.user?._id || oneRecommendation.user) === String(currentUser._id) && (
              
              <section>
                <Link to={`/recommendation/update-recommendation/${oneRecommendation._id}`}>
                  <button className="edit-btn">Edit</button>
                </Link>
                <button className="delete-btn"onClick={() => handleDeleteRecommendation(oneRecommendation._id)}>
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
