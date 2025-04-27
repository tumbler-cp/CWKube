import { createContext, ReactNode, useState } from 'react'
import { User } from '../types/User'
import axios from 'axios'

interface AuthContextType {
    user: User | null
    signin: (username: string, password: string) => Promise<void>
    signup: (username: string, password: string) => Promise<void>
    signout: () => void
    update: (user: User) => Promise<string>
    upd: () => Promise<void>
    loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const tokenKey = 'delivers_token'

    const me = async () => {
        try {
            const response = await axios.get('/auth/me')
            setUser(response.data)
        } catch (error) {
            setUser(null)
            console.error('Error fetching user:', error)
        }
    }

    const signin = async (username: string, password: string) => {
        const response = await axios.post('/auth/login', { username, password })
        localStorage.setItem(tokenKey, response.data.token)
        axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`
        await me()
    }

    const signup = async (username: string, password: string) => {
        const response = await axios.post('/auth/register', {
            username,
            password,
        })
        localStorage.setItem(tokenKey, response.data.token)
        axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`
        await me()
    }

    const update = async (user: User) => {
        const response = await axios.post('/auth/update', user)
        await upd()
        return response.data
    }

    const upd = async () => {
        setLoading(true)
        const token = localStorage.getItem(tokenKey)
        if (token) {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
        }
        try {
            await me()
        } catch (error) {
            console.error('Failed to fetch user:', error)
        } finally {
            setLoading(false)
        }
    }

    const signout = async () => {
        setUser(null)
        localStorage.removeItem(tokenKey)
        delete axios.defaults.headers.common.Authorization
    }

    return (
        <AuthContext.Provider
            value={{ user, signin, signup, signout, update, upd, loading }}
        >
            {children}
        </AuthContext.Provider>
    )
}
