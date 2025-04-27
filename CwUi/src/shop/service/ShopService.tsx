import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
} from 'react'
import { Good, Sender } from '../../auth/types/All'
import axios from 'axios'

interface ShopContextType {
    subscriptions: Sender[]
    updateSubs: () => Promise<void>
    goods: Good[]
    updateGoods: () => Promise<void>
    selected: Sender | null
    setSelected: Dispatch<SetStateAction<Sender | null>>
}

export const ShopContext = createContext<ShopContextType | undefined>(undefined)

export const ShopProvider = ({ children }: { children: ReactNode }) => {
    const [subscriptions, setSubs] = useState<Sender[]>([])
    const [goods, setGoods] = useState<Good[]>([])
    const [selected, setSelected] = useState<Sender | null>(null)

    const updateSubs = async () => {
        await axios.get('/customer/subs').then((r) => setSubs(r.data))
    }

    const updateGoods = async () => {
        await axios
            .get(`/sender/goods?id=${selected?.id}`)
            .then((r) => setGoods(r.data))
    }

    return (
        <ShopContext.Provider
            value={{
                subscriptions,
                updateSubs,
                goods,
                updateGoods,
                selected,
                setSelected,
            }}
        >
            {children}
        </ShopContext.Provider>
    )
}
