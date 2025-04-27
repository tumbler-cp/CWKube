import { useContext, useEffect, useState } from 'react'
import { SenderContext } from '../service/SenderService'
import { Button, TextField } from '@mui/material'

const SenderPage = () => {
    const senderContext = useContext(SenderContext)

    if (!senderContext) return null

    const { sender, me, subscribe, update } = senderContext

    const [shopName, setShopName] = useState(sender?.shopName)

    useEffect(() => {
        me().catch(() => {})
    }, [])

    useEffect(() => {
        setShopName(sender?.shopName)
    }, [sender])

    return (
        <div className="mx-auto my-auto p-4">
            {sender ? (
                <div>
                    <h1 className="text-2xl">
                        Обновить информацию отправителя
                    </h1>
                    <form className="flex flex-col space-y-4 my-4">
                        <p>Название склада</p>
                        <TextField
                            type="text"
                            name="shopName"
                            label=""
                            variant="outlined"
                            value={shopName}
                            onChange={(e) => setShopName(e.target.value)}
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '16px' }}
                            onClick={(e) => {
                                e.preventDefault()
                                shopName && update(shopName)
                            }}
                        >
                            Обновить
                        </Button>
                    </form>
                </div>
            ) : (
                <div>
                    <h1>Вы не являйтесь отправителем</h1>
                    <form
                        className="flex flex-col space-y-4 my-4"
                        onSubmit={async (e) => {
                            e.preventDefault()
                            const token = (e.target as any).elements.token.value
                            await subscribe(token)
                        }}
                    >
                        <TextField
                            type="text"
                            name="token"
                            label="Токен"
                            variant="outlined"
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '16px' }}
                        >
                            Стать отправителем
                        </Button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default SenderPage
