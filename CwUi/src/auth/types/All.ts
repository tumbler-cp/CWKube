export type Good = {
    id: number
    name: string
    description: string
    weight: number
    sender: string
}

export type WHPosition = {
    id: number
    good: Good
    quantity: number
}

export type DroneStation = {
    id: number
    address: string
}

export type Sender = {
    id: number
    shopName: string
}

export type BindRequest = {
    userID: number
    token: {
        token: string
    }
}
