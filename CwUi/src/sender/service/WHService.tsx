import { createContext, ReactNode, useEffect, useState } from 'react'
import { WHPosition } from '../../auth/types/All'
import axios from 'axios'

interface WHContextType {
    positions: WHPosition[]
    update: () => Promise<void>
    createPosition: (newPos: WHPosition) => Promise<void>
    changePosition: (pos: WHPosition) => Promise<void>
}

export const WHContext = createContext<WHContextType | undefined>(undefined)

export const WHProvider = ({ children }: { children: ReactNode }) => {
    const [positions, setPositions] = useState<WHPosition[]>([])

    const update = async () => {
        const response = axios.get('/warehouse/positions')
        setPositions((await response).data)
    }

    const createPosition = async (newPos: WHPosition) => {
        await axios.post('/warehouse/new_position', newPos)
        await update()
    }

    const changePosition = async (pos: WHPosition) => {
        await axios.post('/warehouse/change_position', pos)
        await update()
    }

    useEffect(() => {
        update()
    }, [])

    return (
        <WHContext.Provider
            value={{ positions, update, createPosition, changePosition }}
        >
            {children}
        </WHContext.Provider>
    )
}
