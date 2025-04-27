import { useContext } from 'react'
import {
    CustomerOrderContext,
    Order,
    OrderStage,
} from '../service/OrderService'
import { Button, Card, CardContent } from '@mui/material'
import { FaCheck } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'

const CustomerOrders = () => {
    const orderContext = useContext(CustomerOrderContext)

    if (!orderContext) return null

    const { orders, acceptOrder, rejectOrder, receiveOrder } = orderContext

    const handleAccept = (order: Order) => {
        acceptOrder(order)
    }

    const handleReject = (order: Order) => {
        rejectOrder(order)
    }

    const handleReceive = (order: Order) => {
        receiveOrder(order)
    }

    const renderOrders = (stage: OrderStage) => {
        return orders
            .filter((order) => order.stage === stage)
            .map((order) => (
                <Card
                    key={order.id}
                    className="m-2 p-4 border rounded-lg shadow-sm"
                >
                    <CardContent className="flex flex-col gap-2">
                        <p className="text-lg font-semibold">{order.sender}</p>
                        <p className="text-sm text-gray-600">
                            Конечный пункт: {order.destination}
                        </p>
                        <p className="text-sm text-gray-600">
                            Последнее изменение: {order.orderDate}
                        </p>

                        {stage === OrderStage.CREATED && (
                            <div className="flex gap-2 mt-2">
                                <Button onClick={() => handleAccept(order)}>
                                    <FaCheck className="w-4 h-4 mr-1" />{' '}
                                    Подтвердить
                                </Button>
                                <Button onClick={() => handleReject(order)}>
                                    <ImCross className="w-4 h-4 mr-1" />{' '}
                                    Отменить
                                </Button>
                            </div>
                        )}
                        {stage === OrderStage.DELIVERY && (
                            <Button
                                className="mt-2"
                                onClick={() => handleReceive(order)}
                            >
                                Получить
                            </Button>
                        )}
                    </CardContent>
                </Card>
            ))
    }

    return (
        <div className="flex gap-4 grow p-10">
            <div className="w-1/3">
                <h4 className="text-xl font-bold mb-4 text-center">Открыто</h4>
                {renderOrders(OrderStage.CREATED)}
            </div>
            <div className="w-1/3">
                <h4 className="text-xl font-bold mb-4 text-center">
                    В доставке
                </h4>
                {renderOrders(OrderStage.DELIVERY)}
            </div>
            <div className="w-1/3">
                <h4 className="text-xl font-bold mb-4 text-center">Окончено</h4>
                {renderOrders(OrderStage.COMPLETED)}
            </div>
        </div>
    )
}

export default CustomerOrders
