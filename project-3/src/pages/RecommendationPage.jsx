import React from 'react'
import { Link,useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFavorites } from '../context/FavoritesContext';

const RecommendationPage = () => {
    const { mood } = useParams();
    const navigate=useNavigate();
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm,setSearchTerm]=useState('');
    const[selectedCategory,setSelectedCategory]=useState('');
    const[suggestions,setSuggestions]=useState([]);

  
    const[showOnlyFavorites,setShowOnlyFavorites]=useState(false);

    const{favorites,toggleFavorite}=useFavorites();

    const allCategories=['movie','song','quote','book','podcast'];

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

       

        if (loading) {
            return <p>Loading recommendations...</p>; // Show loading indicator
          }


  return (
    <div className="recommendation-container">

        <div className="button-group">
          <Link to="/create-recommendation">
        <button className="add-recommendation-btn">Add a recommendation</button>
        </Link>

        <button onClick={()=>navigate('/favorites')} className="view-fav-btn">View Favourites</button>
</div>

        <h1 className="recommendation-title">Your mood: {mood}</h1>


        {/*Search bar*/}
        <div className="search-bar-wrapper">
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

       

        <div className="recommendation-container">
            {recommendations .filter((oneReco)=>
            searchTerm.trim()===''
            ?true
            :oneReco.category?.toLowerCase().includes(searchTerm.trim().toLowerCase())
            
        ).map((oneReco)=> (
          <div key={oneReco._id} className="recommendation-item">
                    <img src={oneReco.image} alt={oneReco.title} className="recommendation-image" />
                    <h2 className="recommendation-title">{oneReco.title}</h2>
                    <p className="recommendation-category">{oneReco.category}</p>
                    <p className="recommendation-description">Description :{oneReco.description.split(" ").slice(0, 20).join(" ")}...
                    </p>
                    <Link to={`/recommendation/${oneReco._id}`}>
                        <button className="recommendation-details-btn">View details</button>
                    </Link>
                    

                <button onClick={()=>toggleFavorite(oneReco)} 
                className={`heart-btn ${favorites.some(fav=>fav._id===oneReco._id)?'liked':''}`}>
                    {favorites.some(fav=>fav._id===oneReco._id)?'❤️':'🤍'}
                    </button>
                </div>

                
            ))}
            </div>
     </div>

)

}

export default RecommendationPage;