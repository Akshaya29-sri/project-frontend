import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthContextWrapper } from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { RecommendationContextWrapper } from './context/RecommendationContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthContextWrapper>
     <RecommendationContextWrapper>
        <App />
    </RecommendationContextWrapper>
    </AuthContextWrapper>
    </BrowserRouter>
  </StrictMode>,
)
