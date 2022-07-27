import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material"
import { Container } from "@mui/system"
import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import NewPaymentBtn from "../components/MainPage/NewPaymentBtn"
import { CustomText } from "../components/MainPage/CustomText"
import { changeModal } from "../store/slices/modalSlice"
import { loadPayments } from "../store/slices/paymentSlice"
import { getDatabase, ref, remove } from "firebase/database"
import { StorageCard } from "../components/MainPage/StorageCard"

const MainPage = () => {
	const navigate = useNavigate()
	const { user } = useAppSelector((state) => state.user)
	const { storages } = useAppSelector((state) => state.card)
	const [submitOpen, setSubmitOpen] = useState<boolean | string>(false)
	const dispatch = useAppDispatch()

	const handleOpen = (id: string) => {
		setSubmitOpen(id)
	}

	const handleClose = () => {
		setSubmitOpen(false)
	}

	const handlePayment = (sign: string) => {
		dispatch(loadPayments(sign))
		navigate("/main/hub/newpayment")
	}

	const deleteCard = (id: string) => {
		const db = getDatabase()
		const refer = ref(
			db,
			`/users/${typeof user !== "string" ? user.uid : "null"}/storages/${id}`
		)
		remove(refer)
	}

	const handleNewStorage = () => {
		navigate("/main/hub/newstorage")
		dispatch(changeModal(true))
	}

	const handleHistory = (id: string) => {
		navigate(`history/${id}`)
	}

	return (
		<>
			<Container maxWidth='xs'>
				<Box
					sx={{
						height: "250px",
						display: "flex",
						alignItems: "center",
						flexDirection: "row",
						overflowX: "auto",
						"& :::-webkit-scrollbar": {
							display: "none",
						},
					}}
				>
					<>
						{storages
							? Object.entries(storages).map(
									(
										storage: [
											string,
											{
												description: string
												name: string
												balance: number
												curren: string
											}
										]
									) => {
										return (
											<StorageCard
												key={storage[0]}
												storage={storage}
												handleOpen={handleOpen}
												handleHistory={handleHistory}
											/>
										)
									}
							  )
							: null}
					</>

					<Box
						sx={{
							backgroundColor: "primary.main",
							borderRadius: "25px",
							margin: 0,
							minWidth: "80%",
							minHeight: "80%",
							display: "flex",
							flexDirection: "column",
							textAlign: "center",
							justifyContent: "center",
							alignItems: "center",
							padding: "10px 15px",
							boxShadow: 5,
						}}
						onClick={handleNewStorage}
					>
						<CustomText color='primary.light' children={"Add new vault"} />
						<AddCircleOutlineIcon
							sx={{ color: "primary.light", width: "100px", height: "100px" }}
						/>
					</Box>
				</Box>

				<Box
					sx={{
						marginTop: "20px",
						display: "flex",
						flexDirection: "column",
						height: "calc(100vh - 56px - 95px - 250px)",
						overflow: "scroll",
					}}
				>
					<CustomText children={"New payment"} color={"primary"} />
					<NewPaymentBtn
						disabled={!(Object.entries(storages).length > 0)}
						onClick={() => handlePayment("-")}
						children={"Expense"}
					/>
					<NewPaymentBtn
						disabled={!(Object.entries(storages).length > 0)}
						onClick={() => handlePayment("+")}
						children={"Income"}
					/>
				</Box>
			</Container>
			<Dialog
				open={!!submitOpen}
				onClose={handleClose}
				aria-labelledby='draggable-dialog-title'
			>
				<DialogTitle style={{ cursor: "move" }} id='draggable-dialog-title'>
					Sure?
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<span> Are you sure you want to delete this vault?</span>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose}>
						Decline
					</Button>
					<Button
						onClick={() => {
							deleteCard(typeof submitOpen == "string" ? submitOpen : "null")
							handleClose()
						}}
					>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
			<Outlet />
		</>
	)
}

export default MainPage
