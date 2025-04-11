import React, { useState } from 'react'

const CreateRecommendationPage = () => {

    const [category, setCategory] = useState([]);
    const [title, setTitle] = useState("");
    const [creator, setCreator] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [image, setImage] = useState("");
    const [mood, setMood] = useState([]);


    /*category: {
        type: String,
        required: true,
        enum: ["movie", "song", "book", "quote", "podcast"],
      },
      title: {
        type: String,
        required: true,
      },
      creator: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      url: {
        type: String,
      },
      image: {
        type: String,
      },
      mood: {
        type: String,
        required: true,
        enum: [
          "happy",
          "sad",
          "angry",
          "tired",
          "anxious",
          "romantic",
          "bored",
          "calm",
        ],
      },*/

  return (
    <div className="add-recommendation-form">
      <h2>Create a Recommendation</h2>
      <form
        onSubmit={(event) => {
          handleCreateRecommendation(event, {
            title,
            toppings,
            size,
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
            <option value="movie">--Choose a category--</option>
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
          Url :
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <label>
          Recommendation Image :
          <input type="image" value={image} name="image" onChange={(e) => setImage(e.target.value)} />
        </label>
        <button type="submit">Add a recommendation to your list</button>
      </form>
    </div>
  )
}

export default CreateRecommendationPage