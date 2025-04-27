import { createContext, ReactNode, useEffect, useState } from 'react'
import { Order } from './OrderService'
import axios from 'axios'

interface SenderOrderContextType {
    orders: Order[]
    update: () => Promise<void>
}

export const SenderOrderContext = createContext<
    SenderOrderContextType | undefined
>(undefined)

const SenderOrderProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState<Order[]>([])

    const update = async () => {
        await axios.get('/order/sender/all').then((r) => setOrders(r.data))
    }

    useEffect(() => {
        update()
    }, [])

    return (
        <SenderOrderContext.Provider value={{ orders, update }}>
            {children}
        </SenderOrderContext.Provider>
    )
}

export default SenderOrderProvider
