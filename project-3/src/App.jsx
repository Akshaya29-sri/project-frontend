import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './pages/LandingPage'
import NavBar from './components/NavBar'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { SignUpPage } from './pages/SignUpPage'
import {LoginPage} from './pages/LoginPage'
import ProfilePage from './pages/ProfllePage'
import { ProtectedRoute } from './components/ProtectedRoute'
import RecommendationPage from './pages/RecommendationPage'
import MoodHistoryPage from './pages/MoodHistoryPage'
import CreateRecommendationPage from './pages/CreateRecommendationPage'
import  { AllRecommendations } from './pages/AllRecommendations'
import UpdateRecommendationPage from './pages/UpdateRecommendation'
import AboutPage from './pages/AboutPage'
import FavoritesPage from './pages/FavoritePage'
import NotFoundPage from './pages/NotFoundPage'
import UserStats from './pages/UserStats'
import RecommendationDetailPage from './pages/RecommendationDetailPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

   // Toggle dark mode
   const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
   }

   useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);


return (
    <>
      <div className={`App ${isDarkMode ? "dark-mode" : ""}`}>
        <NavBar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage/>
            </ProtectedRoute>
          }/>
          <Route path="/recommendations/:mood" element={
            <ProtectedRoute>
              <RecommendationPage />
            </ProtectedRoute>
          } />
          <Route path="/create-recommendation" element={
            <ProtectedRoute>
              <CreateRecommendationPage />
            </ProtectedRoute>
          } />
          <Route path="/mood/all-mood" element={
            <ProtectedRoute>
              <MoodHistoryPage />
            </ProtectedRoute>
          } />
          <Route path="/recommendation/:id" element={
            <ProtectedRoute>
              <RecommendationDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/all-recommendations" element={
            <ProtectedRoute>
              <AllRecommendations />
            </ProtectedRoute>
          } />
          <Route path="/recommendation/:recommendationId" element={
            <ProtectedRoute>
              <UpdateRecommendationPage />
            </ProtectedRoute>
          } />
          <Route path="/recommendation/update-recommendation/:recommendationId" element={
            <ProtectedRoute>
              <UpdateRecommendationPage />
            </ProtectedRoute>
          } />
          <Route path="/your-stats" element={
            <ProtectedRoute>
              <UserStats />
            </ProtectedRoute>
          } />
          <Route path="/favorites" element={
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          } />
          <Route path="/about" element={<AboutPage />}/>
          <Route path="*" element={<NotFoundPage />}/>

        
        </Routes>

        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        theme="colored"
      />
        </div>
    </>
  )
}

export default App
