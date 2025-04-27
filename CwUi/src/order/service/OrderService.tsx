import axios from 'axios'
import { createContext, ReactNode, useEffect, useState } from 'react'

export enum OrderStage {
    CREATED = 'CREATED',
    DELIVERY = 'DELIVERY',
    COMPLETED = 'COMPLETED',
}

export enum OrderAcceptance {
    ACCEPTED,
    REJECTED,
}

export type Order = {
    id: number
    orderDate: string
    acceptance: OrderAcceptance
    stage: OrderStage
    sender: string
    destination: string
}

interface CustomerOrderContextType {
    orders: Order[]
    acceptOrder: (order: Order) => Promise<void>
    rejectOrder: (order: Order) => Promise<void>
    receiveOrder: (order: Order) => Promise<void>
    update: () => Promise<void>
}

export const CustomerOrderContext = createContext<
    CustomerOrderContextType | undefined
>(undefined)

const CustomerOrderProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState<Order[]>([])

    const acceptOrder = async (order: Order) => {
        await axios.post('/order/accept', order)
        await update()
    }

    const rejectOrder = async (order: Order) => {
        await axios.post('/order/reject', order)
        await update()
    }

    const receiveOrder = async (order: Order) => {
        await axios.post('/order/receive', order)
        await update()
    }

    const update = async () => {
        await axios.get('/order/customer/all').then((r) => setOrders(r.data))
    }

    useEffect(() => {
        update()
    }, [])

    return (
        <CustomerOrderContext.Provider
            value={{ orders, acceptOrder, rejectOrder, receiveOrder, update }}
        >
            {children}
        </CustomerOrderContext.Provider>
    )
}

export default CustomerOrderProvider
