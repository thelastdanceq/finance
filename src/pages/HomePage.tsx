import { AppBar, Box, Container, MobileStepper, Toolbar, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/redux';



const HomePage = () => {
    const [page, setPage] = useState(0);
    const navigator = useNavigate();
    const { user } = useAppSelector((state) => state.user)

    useEffect(() => {
        navigator(`/home/${page}`)
        if (user !== "none") {
            navigator('/main/hub')
        }
    }, [navigator, page, user])
    return (
        <Container maxWidth="xs"  >
            <Box sx={{ height: "calc(100vh - 114px - 56px)" }}>
                <AppBar position="static" sx={{ padding: "50px 15px 0 15px" }}>
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: 0 }}>
                        <>
                            {
                                page === 1 || page === 2 ?
                                    <Link to={`/home/${page - 1}`}>
                                        <ArrowBackIcon
                                            onClick={() => setPage(page - 1)}
                                            sx={{ color: "white" }}
                                        /> </Link> : <AttachMoneyIcon />
                            }
                        </>
                        <Typography
                            variant="h6"
                            component="div"
                        >
                            Money Counter
                        </Typography>

                        <>
                            {page === 0 || page === 1 ?
                                <Link to={`/home/${page + 1}`}>
                                    <ArrowForwardIcon
                                        onClick={() => setPage(page + 1)}
                                        sx={{ color: "white" }}
                                    /> </Link> : <AttachMoneyIcon />
                            }
                        </>

                    </Toolbar>
                </AppBar>
                <Box sx={{
                    backgroundColor: 'primary.main',
                    height: "100%",
                    padding: "0 15px",
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "column"
                }}>
                    <Outlet />
                </Box >

                <MobileStepper
                    steps={3}
                    variant="dots"
                    position="static"
                    activeStep={page}
                    backButton={null}
                    nextButton={null}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingBottom: "40px"
                    }}
                />
            </Box>
        </Container >
    )
}

export default HomePage