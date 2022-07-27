import { Box, Container } from "@mui/material"
import { getAuth, signOut } from "firebase/auth"
import React, { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Footer } from "../MainPage/Footer"
import { Header } from "../MainPage/Header"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { loadUser } from "../../store/slices/userSlice"

export function MainLayout() {
	const auth = getAuth()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { user } = useAppSelector((state) => state.user)

	const handleLogOut = () => {
		signOut(auth)
			.then(() => {
				navigate("/home")
				dispatch(loadUser("none"))
			})
			.catch((err) => console.log(err))
	}

	useEffect(() => {
		if (user === "none") {
			navigate("/home")
		}
	}, [user, navigate])
	return (
		<>
			<Container
				maxWidth='xs'
				sx={{ display: "flex", flexDirection: "column", position: "relative" }}
			>
				<Header onClick={handleLogOut} />

				<Box
					sx={{
						height: "calc(100vh - 56px - 95px)",
						backgroundColor: "primary.light",
						padding: " 0 15px",
					}}
				>
					<Outlet />
				</Box>

				<Footer />
			</Container>
		</>
	)
}
