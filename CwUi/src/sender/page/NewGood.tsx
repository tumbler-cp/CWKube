import React, { useContext, useState } from 'react'
import { TextField, Button, Container, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Good } from '../../auth/types/All'
import { GoodContext } from '../service/GoodService'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
        '& .MuiTextField-root': {
            margin: '8px',
        },
        '& .MuiButton-root': {
            margin: '8px',
        },
    },
})

const NewGood: React.FC = () => {
    const goodContext = useContext(GoodContext)
    const nav = useNavigate()

    if (!goodContext) return null

    const { createGood } = goodContext

    const classes = useStyles()
    const [good, setGood] = useState<Partial<Good>>({
        name: '',
        description: '',
        weight: 0,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setGood((prevGood) => ({
            ...prevGood,
            [name]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        createGood(good as Good).then(() => nav('/goods'))
    }

    return (
        <Container maxWidth="sm" className="mx-auto my-auto">
            <Typography variant="h4" className="mb-4">
                Создать новый товар
            </Typography>
            <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField
                    label="Название"
                    name="name"
                    variant="outlined"
                    fullWidth
                    required
                    value={good.name}
                    onChange={handleChange}
                />
                <TextField
                    label="Описание"
                    name="description"
                    variant="outlined"
                    fullWidth
                    required
                    value={good.description}
                    onChange={handleChange}
                />
                <TextField
                    label="Вес (г)"
                    name="weight"
                    type="number"
                    variant="outlined"
                    fullWidth
                    required
                    value={good.weight}
                    onChange={handleChange}
                />
                <Button variant="contained" color="primary" type="submit">
                    Создать
                </Button>
            </form>
        </Container>
    )
}

export default NewGood
