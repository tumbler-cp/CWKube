import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthMain from './auth/pages/AuthMain.tsx'
import { AuthProvider } from './auth/service/AuthService.tsx'
import Signin from './auth/pages/Signin.tsx'
import Signup from './auth/pages/Signup.tsx'
import AuthGuard from './auth/guard/AuthGuard.tsx'
import { ProfileProvider } from './sender/service/ProfileService.tsx'

const root = document.getElementById('root')

if (root) {
    axios.defaults.baseURL = 'http://localhost:8080'
    createRoot(root).render(
        <AuthProvider>
            <ProfileProvider>
                <StrictMode>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path="*"
                                element={
                                    <AuthGuard>
                                        <App />
                                    </AuthGuard>
                                }
                            />
                            <Route path="auth" element={<AuthMain />} />
                            <Route path="signin" element={<Signin />} />
                            <Route path="signup" element={<Signup />} />
                        </Routes>
                    </BrowserRouter>
                </StrictMode>
            </ProfileProvider>
        </AuthProvider>
    )
}
