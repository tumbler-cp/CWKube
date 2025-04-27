import { useContext, useEffect, useState } from 'react'
import { Good } from '../../auth/types/All'
import { GoodContext } from '../service/GoodService'
import { useNavigate } from 'react-router-dom'

const GoodComponent = ({ g }: { g: Good }) => {
    return (
        <div className="bg-white drop-shadow-xl rounded-lg p-4 mb-4">
            <ul className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <li className="font-bold text-lg">{g.name}</li>
                <li className="mt-2 sm:mt-0 sm:ml-4 text-gray-600">
                    {g.description}
                </li>
                <li className="mt-2 sm:mt-0 sm:ml-4 text-gray-600">
                    {g.weight} г
                </li>
                <li className="mt-2 sm:mt-0 sm:ml-4 text-gray-600">
                    {g.sender}
                </li>
            </ul>
        </div>
    )
}

const Goods = () => {
    const [goodsList, updGoods] = useState<Good[]>([])

    const goodContext = useContext(GoodContext)

    const nav = useNavigate()

    if (!goodContext) return null

    const { goods } = goodContext

    useEffect(() => {
        updGoods(goods)
    }, [goods])

    return (
        <div className="mx-auto my-auto max-w-4xl p-4">
            <button className="auth-btn mb-4" onClick={() => nav('/newgood')}>
                Добавить товар
            </button>
            <ul>
                {goodsList.map((good) => (
                    <GoodComponent key={good.id} g={good} />
                ))}
            </ul>
        </div>
    )
}

export default Goods
