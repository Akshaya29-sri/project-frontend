import React, { useContext, useEffect, useState } from 'react'
import { RecommendationContext, RecommendationContextWrapper } from '../context/RecommendationContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateRecommendationPage = () => {

    const [category, setCategory] = useState([]);
    const [title, setTitle] = useState("");
    const [creator, setCreator] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [mood, setMood] = useState([]);
    const { recommendationId } = useParams();
    const { recommendations, setRecommendations } = useContext(RecommendationContext);
    //const { handleCreateRecommendation } = useContext(RecommendationContext);
    const { currentUser } = useContext(AuthContext); 
    const nav = useNavigate();
    
    useEffect(()=>{
        function getOneRecommendation() {
            axios
            .get(`${import.meta.env.VITE_API_URL}/api/recommendation/${recommendationId}`)
            .then((res) => {
                console.log("here is one recommendation", res.data);
                setCategory(res.data.category);
                setTitle(res.data.title);
                setCreator(res.data.creator);
                setDescription(res.data.description);
                setImage(res.data.image);
                setMood(res.data.mood);
                setCreator(res.data.creator);
            })
            .catch((err)=> console.log(err));
        }
        getOneRecommendation();
    }, [recommendationId]);
    
    function handleUpdateRecommendation(event) {
        event.preventDefault();
        console.log("🚀 handleUpdateRecommendation has been called");
        const updatedRecommendation = {
          category,
          title,
          creator,
          description,
          image,
          mood,
          user: currentUser._id,
        };
        axios
          .put(
            `${import.meta.env.VITE_API_URL}/api/recommendation/update-recommendation/${recommendationId}`,
            updatedRecommendation
          )
          .then((res) => {
            console.log("Updated recommendation: ", res.data)
            console.log("res.data.user", res.data.user);
            console.log("typeof res.data.user", typeof res.data.user);

                        const newRecommendationArray = recommendations.map((oneRecommendation) => {
                if (oneRecommendation && oneRecommendation._id === recommendationId) {
                return res.data;
              } else {
                return oneRecommendation;
              }
            });
    
            console.log("new recommendation array", newRecommendationArray);
            setRecommendations(newRecommendationArray);
            nav("/all-recommendations");
            toast.success("Recommendation updated ✅");
          })
          .catch((err) => console.log(err));
      }
  return (
    <div className="edit-recommendation-form">
      <h2>Update your Recommendation</h2>
      <form
        onSubmit={handleUpdateRecommendation}>
        <label className="form-label">
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
        <label className="form-label">
          Title :
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="form-label">
          Creator :
          <input
            type="text"
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
          />
        </label>
        <label className="form-label">
          Description :
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="form-label">
            Recommendation image:
        <input
            type="text"
            value={image}
            placeholder="https://www.wepluggoodmusic.com/wp-content/uploads/2015/05/hiatus-kaiyote-album-cover.jpg"
            onChange={(e) => setImage(e.target.value)}
        />
        </label>
        <label className="form-label">
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
        <button type="submit" className="form-label-btn">Update your recommendation</button>
      </form>
    </div>
  )
}

export default UpdateRecommendationPage