import { useState } from 'react'
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


function App() {
return (
    <>
      
        <NavBar />
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
          <Route path="/mood/all-mood" element={
            <ProtectedRoute>
              <MoodHistoryPage />
            </ProtectedRoute>
          } />
        
        </Routes>
 
    </>
  )
}

export default App
