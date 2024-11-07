import './App.css'

import { Route, Routes } from "react-router-dom"
import MainPage from './pages/MainPage'
import AuthCallback from './pages/AuthCallback'
import LoginForm from './pages/Login'
import RegisterForm from './pages/Register'

function App() {

  return (
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
  )
}

export default App
