import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../auth/service/AuthService'
import { MenuItem, Select } from '@mui/material'
import { MdExitToApp } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'

const NavBar = () => {
    const authContext = useContext(AuthContext)
    const [mode, setMode] = useState(localStorage.getItem('mode') || 'Customer')

    useEffect(() => {
        localStorage.setItem('mode', mode)
    }, [mode])

    if (!authContext) {
        return null
    }

    const { user, signout } = authContext

    if (!user) {
        return null
    }

    const customerMenuItems = [
        { path: '/', label: 'Главная' },
        { path: '/customer', label: 'Профиль клиента' },
        { path: '/shop', label: 'Заказ' },
        { path: '/receiving', label: 'Доставки и история' },
    ]

    const senderMenuItems = [
        { path: '/', label: 'Главная' },
        { path: '/sender', label: 'Профиль отправителя' },
        { path: '/goods', label: 'Товары' },
        { path: '/warehouse', label: 'Склад' },
        { path: '/history', label: 'История' },
    ]

    const menuItems = mode === 'Customer' ? customerMenuItems : senderMenuItems

    return (
        <nav>
            <div className="flex justify-between items-center py-5 px-5 min-w-screen shadow-xl">
                <ul className="flex flex-row">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className="px-5 py-2 mx-2 rounded-md border-black hover:bg-black hover:text-white hover:shadow-md"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="right-0 flex flex-row">
                    {
                        <Select
                            value={mode}
                            onChange={(e) => setMode(e.target.value as string)}
                            variant="standard"
                            label="Режим"
                        >
                            <MenuItem value="Customer">Получатель</MenuItem>
                            <MenuItem value="Sender">Отправитель</MenuItem>
                        </Select>
                    }
                    <Link
                        className="ml-10 my-auto text-2xl px-2 py-2 rounded-md border-black hover:bg-black hover:text-white hover:shadow-md"
                        to="/profile"
                    >
                        <CgProfile />
                    </Link>
                    <button
                        onClick={signout}
                        className="text-2xl mx-5 mr-10 px-2 py-2 rounded-md border-black hover:bg-black hover:text-white hover:shadow-md"
                    >
                        <MdExitToApp
                            onClick={() => {
                                signout()
                            }}
                        />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
