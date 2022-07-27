import { Modal, Container, Box, Button } from "@mui/material"
import { getDatabase, onValue, ref } from "firebase/database"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CustomText } from "../components/MainPage/CustomText"
import TransItem from "../components/MainPage/TransItem"
import { useAppSelector } from "../hooks/redux"
import CloseIcon from "@mui/icons-material/Close"

export const Transactions = () => {
	const { user } = useAppSelector((state) => state.user)
	const { cardid } = useParams()
	const navigate = useNavigate()
	const db = getDatabase()
	const [trans, setTrans] =
		useState<
			[
				string,
				{ category: string; operation: string; time: string; value: number }
			][]
		>()
	const refer = ref(
		db,
		`/users/${
			typeof user !== "string" ? user.uid : "none"
		}/storages/${cardid}/payments`
	)

	const onClose = () => {
		navigate("/main/hub")
	}
	useEffect(() => {
		onValue(refer, (snapshot) => {
			const time: {} = snapshot.val() as {
				category: string
				operation: string
				time: string
				value: number
			}
			setTrans(Object.entries(time || {}))
		})
	}, [])
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
					// width: "90%"
				}}
			>
				<Box
					sx={{
						backgroundColor: "primary.light",
						borderRadius: "25px",
						padding: "20px",
						position: "relative",
					}}
				>
					<Button
						onClick={onClose}
						variant='contained'
						sx={{
							minWidth: "0px",
							padding: "10px",
							position: "absolute",
							top: "5px",
							right: "35px",
						}}
					>
						<CloseIcon />
					</Button>
					<CustomText>Last Payments</CustomText>
					<Box sx={{ marginTop: "30px", maxHeight: "50vw", overflow:"auto" }}>
						{trans && trans.length > 0 ? (
							trans.map((entry) => {
								return entry[0] !== "0" ? (
									<TransItem key={entry[0]} {...entry[1]} />
								) : null
							})
						) : (
							<CustomText color='secondary' size='2em'>
								Nothing here ...
							</CustomText>
						)}
					</Box>
				</Box>
			</Container>
		</Modal>
	)
}
