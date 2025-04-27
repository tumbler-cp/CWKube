import { useContext } from 'react'
import { SenderOrderContext } from '../service/SenderOrderService'
import { Card, CardContent } from '@mui/material'
import { useEffect } from 'react'

const SenderOrders = () => {
    const senderOrderContext = useContext(SenderOrderContext)

    if (!senderOrderContext) return null

    const { orders, update } = senderOrderContext

    useEffect(() => {
        const interval = setInterval(() => {
            update()
        }, 5000)

        return () => clearInterval(interval)
    }, [update])

    return (
        <div className="flex flex-col gap-4 p-10">
            <div className="w-full">
                <h4 className="text-xl font-bold mb-4 text-center">
                    Все заказы
                </h4>
                {orders.map((order) => (
                    <Card
                        key={order.id}
                        className="m-2 p-4 border rounded-lg shadow-sm"
                    >
                        <CardContent className="flex flex-col gap-2">
                            <p className="text-lg font-semibold">
                                {order.sender}
                            </p>
                            <p className="text-sm text-gray-600">
                                Конечный пункт: {order.destination}
                            </p>
                            <p className="text-sm text-gray-600">
                                Последнее изменение: {order.orderDate}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default SenderOrders
