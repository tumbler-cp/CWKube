import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'
import { AuthContext } from '../../auth/service/AuthService'
import axios from 'axios'
import { Sender } from '../../auth/types/All'

export type Customer = {
    id: number
    address: string
    subscriptions: Sender[]
}

export type Address = {
    country: string
    city: string
    street: string
    houseNumber: string
}

interface CustomerContextType {
    customer: Customer | null
    me: () => Promise<void>
    subscribe: (token: string) => Promise<void>
    update: (address: Address) => Promise<void>
}

export const CustomerContext = createContext<CustomerContextType | undefined>(
    undefined
)

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
    const [customer, setCustomer] = useState<Customer | null>(null)

    const authContext = useContext(AuthContext)
    if (!authContext) return null

    const { user } = authContext
    if (!user) return null

    const me = async () => {
        await axios
            .get('/customer/current')
            .then((r) => setCustomer(r.data))
            .catch(() => setCustomer(null))
    }

    const subscribe = async (token: string) => {
        await axios.post('/sender/bind/request', {
            userID: user.id,
            token: { token: token },
        })
        await me()
    }

    const update = async (address: Address) => {
        await axios.post('/customer/update', {
            id: customer?.id,
            address:
                address.country +
                ' ' +
                address.city +
                ' ' +
                address.street +
                ' ' +
                address.houseNumber,
        })
        await me()
    }

    useEffect(() => {
        me().catch(() => setCustomer(null))
    }, [])

    return (
        <CustomerContext.Provider value={{ customer, me, subscribe, update }}>
            {children}
        </CustomerContext.Provider>
    )
}
