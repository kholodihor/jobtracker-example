import './App.css'

import { Route, Routes } from "react-router-dom"
import MainPage from './pages/MainPage'
import AuthCallback from './pages/AuthCallback'
import LoginForm from './pages/Login'
import RegisterForm from './pages/Register'
import ForgotPasswordForm from './pages/ForgotPassword'
import ResetPasswordForm from './pages/ResetPassword'

function App() {

  return (
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
      </Routes>
  )
}

export default App
