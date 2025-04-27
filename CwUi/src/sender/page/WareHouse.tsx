import { useContext, useState } from 'react'
import { WHContext } from '../service/WHService'
import { GoodContext } from '../service/GoodService'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    MenuItem,
    TextField,
    Typography,
    Box,
} from '@mui/material'

const NewPosition = () => {
    const whContext = useContext(WHContext)
    const goodContext = useContext(GoodContext)
    const [selectedGood, setSelectedGood] = useState('')
    const [quantity, setQuantity] = useState(0)

    if (!whContext || !goodContext) return null

    const { goods } = goodContext
    const { createPosition } = whContext

    const handleCreatePosition = async () => {
        const good = goods.find((g) => g.id === parseInt(selectedGood))
        if (good) {
            await createPosition({ id: 0, good, quantity })
            setSelectedGood('')
            setQuantity(0)
        }
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Create New Position</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            label="Select Good"
                            value={selectedGood}
                            onChange={(e) => setSelectedGood(e.target.value)}
                            fullWidth
                            margin="normal"
                        >
                            {goods.map((good) => (
                                <MenuItem key={good.id} value={good.id}>
                                    {good.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Quantity"
                            type="number"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(parseInt(e.target.value))
                            }
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={handleCreatePosition}
                    disabled={!selectedGood || quantity <= 0}
                >
                    Create
                </Button>
            </CardActions>
        </Card>
    )
}

const WareHouse = () => {
    const whContext = useContext(WHContext)
    const goodContext = useContext(GoodContext)

    if (!whContext || !goodContext) return null

    const { positions, changePosition } = whContext

    const updateQuantity = async (goodId: number, delta: number) => {
        const position = positions.find((pos) => pos.good.id === goodId)
        if (position && position.quantity + delta >= 0) {
            await changePosition({
                ...position,
                quantity: position.quantity + delta,
            })
        }
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <NewPosition />
                </Grid>
                {positions.map((position) => (
                    <Grid item xs={12} sm={6} md={4} key={position.good.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {position.good.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Quantity: {position.quantity}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    onClick={() =>
                                        updateQuantity(position.good.id, -1)
                                    }
                                >
                                    -
                                </Button>
                                <Button
                                    size="small"
                                    onClick={() =>
                                        updateQuantity(position.good.id, 1)
                                    }
                                >
                                    +
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default WareHouse
