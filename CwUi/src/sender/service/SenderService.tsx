import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'
import { Sender } from '../../auth/types/All'
import axios from 'axios'
import { AuthContext } from '../../auth/service/AuthService'

interface SenderContextType {
    sender: Sender | null
    me: () => Promise<void>
    subscribe: (token: string) => Promise<void>
    update: (shopName: string) => Promise<string>
}

export const SenderContext = createContext<SenderContextType | undefined>(
    undefined
)

export const SenderProvider = ({ children }: { children: ReactNode }) => {
    const [sender, setSender] = useState<Sender | null>(null)

    const authContext = useContext(AuthContext)

    if (!authContext) return null

    const { user } = authContext

    if (!user) return null

    const me = async () => {
        await axios
            .get('/sender/current')
            .then((r) => setSender(r.data))
            .catch(() => setSender(null))
    }

    const subscribe = async (token: string) => {
        await axios.post('/station/bind/request', {
            userID: user?.id,
            token: { token: token },
        })
        await me()
    }

    const update = async (shopName: string) => {
        const response = await axios.post('/sender/update', {
            id: '',
            shopName: shopName,
        })
        await me()
        return response.data
    }

    useEffect(() => {
        me().catch(() => {})
    }, [])

    return (
        <SenderContext.Provider value={{ sender, me, subscribe, update }}>
            {children}
        </SenderContext.Provider>
    )
}
