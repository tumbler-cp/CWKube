import { FormEvent, useContext, useEffect, useState } from 'react'
import { TextField, Button, Container, Box } from '@mui/material'
import { FaCheck } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { AuthContext } from '../../auth/service/AuthService'
import { ProfileContext } from '../service/ProfileService'

const Profile = () => {
    const authContext = useContext(AuthContext)
    const profileContext = useContext(ProfileContext)

    if (!authContext || !profileContext) {
        return null
    }

    const { user, update } = authContext
    const { verify } = profileContext

    if (!user) return null

    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email ? user.email : '')
    const [phone, setPhone] = useState(user.phone ? user.phone : '')
    const [error, setError] = useState('')
    const [verification, setVerification] = useState(false)

    const verifyClick = () => {
        verify().catch((e) => {
            setError(e.response.data)
        })
    }

    const updateClick = (e: FormEvent) => {
        e.preventDefault()
        update({
            id: user.id,
            username: username,
            email: email,
            phone: phone,
            verified: user.verified,
            role: user.role,
        }).catch((e) => {
            setError(e.response.data)
        })
    }

    useEffect(() => {
        if (user.verified) {
            setVerification(true)
        }
    },[])

    return (
        <Container className="mx-auto my-auto" maxWidth="sm">
            <h1 className="text-3xl">Профиль</h1>
            <p className="text-red-500">{error}</p>
            <Box component="form" noValidate autoComplete="off">
                <TextField
                    fullWidth
                    disabled
                    margin="normal"
                    label="Имя пользователья"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Эл.почта"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Телефон"
                    variant="outlined"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                        updateClick(e)
                    }}
                >
                    Обновить профиль
                </Button>
            </Box>
            <div className="text-2xl my-10 flex flex-row p-5">
                <p className="my-auto">Верификация:</p>
                <p className="my-auto ml-5">
                    {verification ? (
                        <FaCheck className="text-green-400" />
                    ) : (
                        <ImCross className="text-red-400" />
                    )}
                </p>
                <button
                    onClick={verifyClick}
                    className="ml-auto text-base border-2 hover:bg-black hover:text-white transition-all duration-150 hover:transition-all hover:duration-150 border-black rounded-md p-3"
                >
                    Подтвердить
                </button>
            </div>
        </Container>
    )
}

export default Profile
