import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	TextField,
} from "@mui/material"
import { Container } from "@mui/system"
import React, { useEffect, useState } from "react"
import CloseIcon from "@mui/icons-material/Close"
import { useNavigate } from "react-router-dom"
import { CustomText } from "../components/MainPage/CustomText"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { loadPayments } from "../store/slices/paymentSlice"
import { getDatabase, onValue, push, ref, update } from "firebase/database"

export const NewPaymentPage = () => {
	const navigate = useNavigate()
	const [categories, setCategories] = useState<Array<string>>()
	const { payments } = useAppSelector((state) => state.payments)
	const { user } = useAppSelector((state) => state.user)
	const { storages } = useAppSelector((state) => state.card)
	const [wallet, setWallet] = useState<string>(Object.keys(storages)[0])
	const [sign, setSign] = useState<string>(
		typeof payments === "string" ? payments : "+"
	)
	const [price, setPrice] = useState<number>(0)
	const [cat, setCat] = useState<string>("")
	const dispatch = useAppDispatch()

	const onClose = () => {
		dispatch(loadPayments(false))
		navigate("/main/hub")
	}

	const handleNewPayment = () => {
		const db = getDatabase()
		const id = typeof user != "string" ? user.uid : "null"
		const rf = ref(db, `/users/${id}/storages/${wallet}/payments`)
		const card = Object.entries(storages).filter((el) => el[0] === wallet)[0]

		sign === "+"
			? push(rf, {
					value: price,
					operation: sign,
					time: Date(),
					category: cat,
			  }).then(() => {
					update(ref(db, `/users/${id}/storages/${wallet}`), {
						balance: card[1].balance + price,
					}).then(() => {
						onClose()
					})
			  })
			: card[1].balance > price
			? push(rf, {
					value: price,
					operation: sign,
					time: Date(),
					category: cat,
			  })
					.then(() => {
						update(ref(db, `/users/${id}/storages/${wallet}`), {
							balance: card[1].balance - price,
						})
					})
					.then(() => {
						onClose()
					})
			: console.log("balance is too low")
	}

	useEffect(() => {
		const db = getDatabase()
		const refer = ref(db, "/categories")
		onValue(refer, (snap) => {
			setCategories(snap.val())
			sign === "+" ? setCat("sallary") : setCat(snap.val()[0])
		})
	}, [sign])
	return (
		<Modal
			open={true}
			sx={{
				backdropFilter: "blur(14px)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Container
				maxWidth='xs'
				sx={{
					margin: "0",
					width: "90%",
				}}
			>
				<Box
					sx={{
						position: "relative",
						backgroundColor: "primary.light",
						borderRadius: "25px",
						textAlign: "center",
						padding: "15px",
					}}
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<CustomText
							children={payments === "-" ? "New expense" : "New income"}
						/>
						<Button
							onClick={onClose}
							variant='contained'
							sx={{ minWidth: "0px", padding: "10px" }}
						>
							<CloseIcon />
						</Button>
					</Box>
					<Box
						sx={{
							dispay: "flex",
							flexDirection: "column",
						}}
					>
						{Object.keys(storages).length > 0 ? (
							<FormControl
								variant='standard'
								sx={{ marginTop: "30px" }}
								fullWidth
							>
								<InputLabel id='demo-simple-select-standard-label'>
									Your cards
								</InputLabel>
								<Select
									labelId='demo-simple-select-standard-label'
									id='demo-simple-select-standard'
									value={wallet}
									variant={"outlined"}
									defaultValue='Ваша карта'
									onChange={(e) => setWallet(e.target.value)}
									label='Curency'
								>
									{Object.keys(storages).length
										? Object.entries(storages).map((item) => {
												return (
													<MenuItem key={item[0]} value={item[0]}>
														{item[1].name}
													</MenuItem>
												)
										  })
										: null}
								</Select>
							</FormControl>
						) : null}
					</Box>
					<Box>
						{payments === "-" ? (
							<Select
								labelId='cats'
								id='cats'
								value={cat}
								variant={"outlined"}
								defaultValue={categories ? categories[0] : "clothes"}
								onChange={(e) => setCat(e.target.value)}
								label='Категория'
								fullWidth
								sx={{ marginTop: "31px" }}
							>
								{categories
									? categories.map((cat) => {
											return (
												<MenuItem key={cat} value={cat}>
													{cat}
												</MenuItem>
											)
									  })
									: null}
							</Select>
						) : (
							<TextField
								fullWidth
								label='Source'
								value={cat}
								onChange={(e) => setCat(e.target.value)}
								sx={{ marginTop: "30px" }}
							/>
						)}
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								marginTop: "31px",
							}}
						>
							<TextField
								fullWidth
								label={payments === "-" ? "Price" : "Income"}
								type='number'
								value={price}
								onChange={(e) => setPrice(+e.target.value)}
								sx={{}}
							/>
							<Select
								labelId='demo-simple-select-standard-label'
								id='demo-simple-select-standard'
								defaultValue={sign}
								value={sign}
								onChange={(e) => setSign(e.target.value)}
								variant={"outlined"}
								label='Curency'
								disabled
							>
								<MenuItem value={"+"}>+</MenuItem>
								<MenuItem value={"-"}>-</MenuItem>
							</Select>
						</Box>
					</Box>

					<Button
						variant='contained'
						sx={{ marginTop: "20px" }}
						onClick={handleNewPayment}
					>
						Write
					</Button>
				</Box>
			</Container>
		</Modal>
	)
}
