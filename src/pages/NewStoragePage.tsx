import { Box, Button, Container, Modal, Select, TextField, FormControl, InputLabel, MenuItem } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { CustomText } from '../components/MainPage/CustomText'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getDatabase, push, ref } from 'firebase/database'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewStorage() {
    const { newStorageModal: modal } = useAppSelector(state => state.newStorageModal);
    const { user } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const [currency, setCurrency] = useState<Array<{
        "r030": number,
        "txt": string,
        "rate": number,
        "cc": string,
        "exchangedate": string
    }>>()


    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [balance, setBalance] = useState<number>(0)
    const [curren, setCurren] = useState<string>()
    const db = getDatabase();


    const onClose = () => {
        navigate('/main/hub')
    }
    const onAddData = () => {
        push(
            ref
                (
                    db,
                    `users/${typeof user !== 'string' && user.uid}/storages`
                ),
            {
                name,
                description,
                balance,
                startBalance: balance,
                curren,
            })
            .then(() => {
                onClose()
                navigate('/main/hub')
                setName("")
                setDescription("")
                setBalance(0)
            })
    }

    useEffect(() => {
        fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
            .then(response => response.json())
            .then(data => {
                setCurrency(data)
                setCurren(data[0].cc)
            })
    }, [])

    return (
        <Modal
            open={true}
            sx={{
                backdropFilter: "blur(14px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Container maxWidth="xs" sx={{
                margin: "0",
                width: "90%"
            }} >
                <Box sx={{
                    position: "relative",
                    backgroundColor: "primary.light",
                    borderRadius: "25px",
                    textAlign: "center",
                    padding: "15px"
                }}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <CustomText children='New vault' />
                        <Button
                            onClick={onClose}
                            variant='contained'
                            sx={{ minWidth: "0px", padding: "10px" }}
                        >
                            <CloseIcon />
                        </Button>
                    </Box>

                    <TextField
                        fullWidth

                        label="Name"
                        autoFocus
                        sx={{ marginTop: "31px" }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        fullWidth

                        label="Description"
                        sx={{ marginTop: "31px" }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}

                    />

                    <Box sx={{ width: "100%", display: "flex" }}>
                        <TextField

                            label="Start balance"
                            sx={{ marginTop: "31px", flexGrow: 2 }}
                            value={balance}
                            type="number"
                            onChange={(e) => setBalance(+e.target.value)}

                        />
                        <>
                            {currency ?
                                <FormControl variant="standard" sx={{ marginTop: "30px", flexGrow: 1 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Curency</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={curren}
                                        variant={"outlined"}
                                        defaultValue="UAH"
                                        onChange={e => setCurren(e.target.value)}
                                        label="Curency"
                                    >
                                        <MenuItem value="UAH">
                                            UAH
                                        </MenuItem>
                                        {currency ?
                                            currency.map(item => {
                                                return (
                                                    <MenuItem key={item.r030} value={item.cc}>{item.cc}</MenuItem>
                                                )
                                            })
                                            : null
                                        }

                                    </Select>
                                </FormControl>
                                : null}
                        </>
                    </Box>

                    <Button
                        color="secondary"
                        fullWidth
                        variant='contained'
                        sx={{ marginTop: "31px", borderRadius: "15px" }}
                        onClick={onAddData}
                    >
                        Add
                    </Button>
                </Box>


            </Container>

        </Modal >
    )
}

export default NewStorage