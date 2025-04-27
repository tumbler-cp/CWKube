import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../service/ShopService'
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'
import axios from 'axios'
import { CustomerContext } from '../../customer/service/CustomerService'
import { useNavigate } from 'react-router-dom'

type CartUnit = {
    goodID: number
    quantity: number
}

const Shop = () => {
    const [cart, setCart] = useState<CartUnit[]>([])

    const customerContext = useContext(CustomerContext)

    const navigate = useNavigate()

    if (!customerContext) return null

    const { customer } = customerContext
    const {
        subscriptions,
        updateSubs,
        goods,
        updateGoods,
        selected,
        setSelected,
    } = useContext(ShopContext) || {}

    useEffect(() => {
        updateSubs?.()
    }, [])

    useEffect(() => {
        if (selected) {
            updateGoods?.()
        }
    }, [selected])

    const handleSenderChange = (event: SelectChangeEvent) => {
        const sender = subscriptions?.find(
            (sender) => sender.id === Number(event.target.value)
        )
        setSelected?.(sender || null)
    }

    const addToCart = (goodId: number) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.goodID === goodId)
            if (existingItem) {
                return prevCart.map((item) =>
                    item.goodID === goodId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            } else {
                return [...prevCart, { goodID: goodId, quantity: 1 }]
            }
        })
    }

    const removeFromCart = (goodId: number) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.goodID === goodId)
            if (existingItem && existingItem.quantity > 1) {
                return prevCart.map((item) =>
                    item.goodID === goodId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            } else {
                return prevCart.filter((item) => item.goodID !== goodId)
            }
        })
    }

    const getQuantity = (goodId: number) => {
        const item = cart.find((item) => item.goodID === goodId)
        return item ? item.quantity : 0
    }

    if (!customer)
        return <div className="mx-auto my-auto text-3xl">Вы не клиент</div>

    const handleOrder = async () => {
        await axios
            .post('/order/create', {
                customerId: customer.id,
                positions: cart,
            })
            .then(() => {
                navigate('/')
            })
        console.log('Order placed:', cart)
    }

    return (
        <div className="w-screen min-h-screen p-4 flex flex-col items-center">
            <div className="w-full max-w-lg mb-4">
                <FormControl fullWidth>
                    <InputLabel id="sender-select-label">
                        Select Sender
                    </InputLabel>
                    <Select
                        labelId="sender-select-label"
                        value={selected?.id?.toString() || ''}
                        onChange={handleSenderChange}
                    >
                        {subscriptions?.map((sender) => (
                            <MenuItem key={sender.id} value={sender.id}>
                                {sender.shopName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
                {goods?.map((good) => (
                    <div
                        key={good.id}
                        className="flex flex-col bg-white shadow-lg rounded-xl p-4 h-full"
                    >
                        <div className="flex-grow text-center">
                            <h5 className="text-xl font-semibold">
                                {good.name}
                            </h5>
                            <p className="text-gray-500">{good.description}</p>
                            <h6 className="text-lg font-bold">
                                {good.weight} г
                            </h6>
                        </div>
                        <div className="flex justify-center items-center gap-4 mt-4">
                            <button
                                className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                                onClick={() => addToCart(good.id)}
                            >
                                +
                            </button>
                            <span className="text-lg font-medium">
                                {getQuantity(good.id)}
                            </span>
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded-lg"
                                onClick={() => removeFromCart(good.id)}
                            >
                                -
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button
                className="bg-green-500 text-white px-6 py-2 rounded-lg mt-8"
                onClick={handleOrder}
            >
                Order
            </button>
        </div>
    )
}

export default Shop
