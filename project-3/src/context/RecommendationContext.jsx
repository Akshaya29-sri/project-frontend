import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const RecommendationContext = createContext();

const RecommendationContextWrapper = ({children}) => {
    const [recommendations, setRecommendations] = useState([]);
    const nav = useNavigate();

    useEffect(()=> {
        getAllRecommendations();
    }, []);

    function getAllRecommendations() {
        axios
        .get(`${import.meta.env.VITE_API_URL}/all-recommendations`)
        .then((res)=> {
            //console.log("all the recommendations", res)
            setRecommendations(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    async function handleCreateRecommendation(event, aRecommendation) {
        event.preventDefault();
        console.log("Event:", event, aRecommendation)
        /*try {
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/create-recommendation`, aRecommendation)
            console.log("recommendation created", data);
            setRecommendations([data, ...recommendations]);
            nav("/all-recommendations")
        } catch (error) {
            console.log(error);
        }*/
    }

    function handleDeleteRecommendation(recommendationId) {
        axios
        .delete(`${import.meta.env.VITE_API_URL}/delete-recommendation/${recommendationId}`)
        .then((res) => {
            console.log("recommendation deleted from the database", res);
            const filteredRecommendation = recommendations.filter((recommendation)=>{
                if (recommendation._id !== recommendationId) {
                    return true;
                }
            })
            setRecommendations(filteredRecommendation);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

  return (
    <RecommendationContext.Provider
        value={{
            recommendations,
            setRecommendations,
            handleCreateRecommendation,
            handleDeleteRecommendation,
        }}
        >
            {children}
        </RecommendationContext.Provider>
  )
}

export { RecommendationContext, RecommendationContextWrapper };