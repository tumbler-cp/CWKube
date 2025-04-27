import { createContext, ReactNode, useEffect, useState } from 'react'
import { Good } from '../../auth/types/All'
import axios from 'axios'

interface GoodContextType {
    goods: Good[]
    update: () => Promise<void>
    createGood: (good: Good) => Promise<string>
}

export const GoodContext = createContext<GoodContextType | undefined>(undefined)

export const GoodProvider = ({ children }: { children: ReactNode }) => {
    const [goods, setGoods] = useState<Good[]>([])

    const update = async () => {
        const response = axios.get('/good/all')
        setGoods((await response).data)
    }

    const createGood = async (good: Good) => {
        const response = await axios.post('/good/new', good)
        await update()
        return response.data
    }

    useEffect(() => {
        update()
    }, [])

    return (
        <GoodContext.Provider value={{ goods, update, createGood }}>
            {children}
        </GoodContext.Provider>
    )
}
