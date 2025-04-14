import React from 'react'
import { Link,useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const RecommendationPage = () => {
    const { mood } = useParams();
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm,setSearchTerm]=useState('');
    const[selectedCategory,setSelectedCategory]=useState('');
    const[suggestions,setSuggestions]=useState([]);

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
          <Link to="/create-recommendation">
        <button className="add-recommendation-btn">Add a recommendation</button>
        </Link>
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
                    <p className="recommendation-description">{oneReco.description}</p>
                    <a
                    href={oneReco.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="recommendation-link"
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