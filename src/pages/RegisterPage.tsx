import React from "react"
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import GoogleIcon from "@mui/icons-material/Google"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../hooks/redux"
import { loadUser } from "../store/slices/userSlice"

const RegisterPage = () => {
	const auth = getAuth()
	const navigate = useNavigate()

	const dispatch = useAppDispatch()

	const sighinWithGoogle = async () => {
		signInWithPopup(auth, new GoogleAuthProvider())
			.then((response) => {
				console.log(response)

				dispatch(loadUser(response.user))
				navigate("/main/hub")
			})
			.catch((err) => console.log(err))
	}

	return (
		<Container maxWidth='xs' sx={{ padding: "0" }}>
			<Box sx={{ height: "calc(100vh - 116px)" }}>
				<AppBar position='static' sx={{ padding: "50px 15px 0 15px" }}>
					<Toolbar
						sx={{
							display: "flex",
							justifyContent: "space-between",
							padding: 0,
							alignItems: "center",
						}}
					>
						<Typography variant='h6' component='div'>
							Registration
						</Typography>
						<HelpOutlineIcon />
					</Toolbar>
				</AppBar>

				<Box
					sx={{
						backgroundColor: "primary.main",
						height: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Box
						color='primary.light'
						sx={{
							width: "80%",
							height: "80%",
							backgroundColor: "primary.light",
							borderRadius: "25px",
							padding: "30px 24px",
							textAlign: "center",
						}}
					>
						<Typography
							variant='h6'
							component='div'
							sx={{
								color: "#16110D",
								fontStyle: "normal",
								fontWeight: 700,
								fontSize: "22px",
								lineHeight: "28px",
							}}
						>
							We are about to start your registration...
						</Typography>
						<Typography
							variant='h6'
							component='div'
							sx={{
								marginTop: "15px",
								color: "#16110D",
								fontStyle: "normal",
								fontWeight: 400,
								fontSize: "17px",
								lineHeight: "22px",
							}}
						>
							Select your preferred language and specify if you are a new user
							or have been registered before.
						</Typography>

						<Box sx={{ marginTop: "10px" }}>
							<Typography
								onClick={sighinWithGoogle}
								variant='h6'
								component='div'
								sx={{
									marginTop: "15px",
									marginBottom: "15px",
									color: "#16110D",
									fontStyle: "normal",
									fontWeight: 400,
									fontSize: "17px",
									lineHeight: "22px",
								}}
							>
								<GoogleIcon
									color='primary'
									sx={{ width: "50px", height: "50px" }}
								/>
							</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
		</Container>
	)
}

export default RegisterPage
