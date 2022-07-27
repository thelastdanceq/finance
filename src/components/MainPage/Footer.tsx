import { Box } from "@mui/material"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import SsidChartIcon from "@mui/icons-material/SsidChart"
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../hooks/redux"

export const Footer = () => {
	const href = useLocation()
	const navigate = useNavigate()
	const handleChangeLink = (str: string) => {
		navigate("/main/" + str)
	}
	const { storages } = useAppSelector((state) => state.card)
	return (
		<Box
			sx={{
				height: "95px",
				backgroundColor: "primary.main",
				borderRadius: "20px 20px 0 0",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				zIndex: 100,
			}}
		>
			<Box
				sx={{
					width: "60%",
					display: "flex",
					justifyContent: "space-between",
					"& svg ": {
						width: "30px",
						height: "30px",
						boxShadow: 2,
						cursor: "pointer",
					},
				}}
			>
				<AccountBalanceWalletIcon
					onClick={() => {
						handleChangeLink("hub")
					}}
					sx={{
						color: href.pathname.includes("hub")
							? "secondary.main"
							: "primary.light",
					}}
				/>
				{Object.keys(storages).length !== 0 ? (
					<SsidChartIcon
						onClick={() => {
							handleChangeLink("stats")
						}}
						sx={{
							color: href.pathname.includes("stats")
								? "secondary.main"
								: "primary.light",
						}}
					/>
				) : (
					<SsidChartIcon
						sx={{
							color: 'gray'
						}}
					/>
				)}
				<CurrencyExchangeIcon
					onClick={() => {
						handleChangeLink("exchange")
					}}
					sx={{
						color: href.pathname.includes("exchange")
							? "secondary.main"
							: "primary.light",
					}}
				/>
			</Box>
		</Box>
	)
}
