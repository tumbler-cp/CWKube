import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../service/AuthService'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const authContext = useContext(AuthContext)
    const navigate = useNavigate()

    if (!authContext) {
        return null
    }

    const { signin } = authContext

    const submit = async (e: FormEvent) => {
        e.preventDefault()
        await signin(username, password)
            .then(() => navigate('/'))
            .catch(() => setError('Неверный логин или пароль'))
    }

    return (
        <div className="mx-auto my-auto text-4xl">
            <h1 className="text-center font-bold m-8">Авторизация</h1>
            <form className="flex flex-col">
                <label className="text-lg font-bold" htmlFor="username">
                    Имя пользователья
                </label>
                <input
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                    className="text-center border-b-2 text-xl p-2 px-4 outline-0"
                    name="username"
                />
                <label className="text-lg font-bold mt-4" htmlFor="password">
                    Пароль
                </label>
                <input
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    className="text-center border-b-2 text-xl p-2 px-4 outline-0"
                    name="password"
                    type="password"
                />
                <p className="text-lg font-bold w-24 mt-4 text-red-500">
                    {error}
                </p>
                <button className="auth-btn" onClick={(e) => submit(e)}>
                    Войти
                </button>
            </form>
        </div>
    )
}

export default Signin
