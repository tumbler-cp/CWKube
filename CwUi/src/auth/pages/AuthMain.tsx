import { useNavigate } from 'react-router-dom'

const AuthMain = () => {
    const nvg = useNavigate()

    const navigateTo = async (url: string) => {
        await nvg(url)
    }

    return (
        <div className="font-mono w-screen h-screen flex">
            <div className="mx-auto my-auto">
                <p className="text-center text-6xl w-100 font-extrabold">
                    Drone Notification System
                </p>
                <div className="flex flex-col mt-5">
                    <button
                        className="auth-btn"
                        onClick={() => {
                            navigateTo('/signin')
                        }}
                    >
                        Войти
                    </button>
                    <button
                        className="auth-btn"
                        onClick={() => {
                            navigateTo('/signup')
                        }}
                    >
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AuthMain
