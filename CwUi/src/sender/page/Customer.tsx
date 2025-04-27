import { useContext, useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material'
import { CustomerContext } from '../../customer/service/CustomerService'

const CustomerPage = () => {
    const customerContext = useContext(CustomerContext)

    if (!customerContext) return null

    const { customer, me, subscribe, update } = customerContext

    const [address, setAddress] = useState({
        country: '',
        city: '',
        street: '',
        houseNumber: '',
    })

    useEffect(() => {
        me().catch(() => {})
    }, [])

    return (
        <div className="mx-auto my-auto p-4">
            {customer ? (
                <div>
                    <h1 className="text-2xl">Обновить информацию клиента</h1>
                    <p>Текущий адрес: {customer.address}</p>
                    <form className="flex flex-col space-y-4 my-4">
                        <p>Адрес</p>
                        <TextField
                            type="text"
                            name="country"
                            label="Страна"
                            variant="outlined"
                            value={address.country}
                            onChange={(e) =>
                                setAddress({
                                    ...address,
                                    country: e.target.value,
                                })
                            }
                            required
                        />
                        <TextField
                            type="text"
                            name="city"
                            label="Город"
                            variant="outlined"
                            value={address.city}
                            onChange={(e) =>
                                setAddress({ ...address, city: e.target.value })
                            }
                            required
                        />
                        <TextField
                            type="text"
                            name="street"
                            label="Улица"
                            variant="outlined"
                            value={address.street}
                            onChange={(e) =>
                                setAddress({
                                    ...address,
                                    street: e.target.value,
                                })
                            }
                            required
                        />
                        <TextField
                            type="text"
                            name="houseNumber"
                            label="Номер дома"
                            variant="outlined"
                            value={address.houseNumber}
                            onChange={(e) =>
                                setAddress({
                                    ...address,
                                    houseNumber: e.target.value,
                                })
                            }
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '16px' }}
                            onClick={(e) => {
                                e.preventDefault()
                                update(address)
                            }}
                        >
                            Обновить
                        </Button>
                    </form>
                </div>
            ) : (
                <div>
                    <h1>Вы не являетесь клиентом</h1>
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
                            Стать клиентом
                        </Button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default CustomerPage
