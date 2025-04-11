import React, { useContext, useState } from 'react'
import { RecommendationContext } from '../context/RecommendationContext';

const CreateRecommendationPage = () => {

    const [category, setCategory] = useState([]);
    const [title, setTitle] = useState("");
    const [creator, setCreator] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [image, setImage] = useState("");
    const [mood, setMood] = useState([]);
    const { handleCreateRecommendation } = useContext(RecommendationContext)

    
  return (
    <div className="add-recommendation-form">
      <h2>Create a Recommendation</h2>
      <form
        onSubmit={(event) => {
          handleCreateRecommendation(event, {
            category,
            title,
            creator,
            description,
            mood,
            owner: currentUser._id,
          });
        }}
      >
        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="none">--Choose a category--</option>
            <option value="movie">Movie</option>
            <option value="song">Song</option>
            <option value="book">Book</option>
            <option value="quote">Quote</option>
            <option value="podcast">Podcast</option>
            </select>
        </label>
        <label>
          Title :
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Creator :
          <input
            type="text"
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
          />
        </label>
        <label>
          Description :
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>        
        <label>
          Correspond to which mood:
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            <option value="none">--Choose a category--</option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="anxious">Anxious</option>
            <option value="romantic">Romantic</option>
            <option value="bored">Bored</option>
            </select>
        </label>
        <button>Add a recommendation to your list</button>
      </form>
    </div>
  )
}

export default CreateRecommendationPage