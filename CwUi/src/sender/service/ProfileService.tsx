import { createContext, ReactNode, useContext } from 'react'
import { AuthContext } from '../../auth/service/AuthService'
import axios from 'axios'

interface ProfileContextType {
    verify: () => Promise<string>
}

export const ProfileContext = createContext<ProfileContextType | undefined>(
    undefined
)

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const authContext = useContext(AuthContext)

    if (!authContext) return null

    const { upd } = authContext

    const verify = async () => {
        const response = await axios.post('/auth/verify')
        await upd()
        return response.data
    }

    return (
        <ProfileContext.Provider value={{ verify }}>
            {children}
        </ProfileContext.Provider>
    )
}
