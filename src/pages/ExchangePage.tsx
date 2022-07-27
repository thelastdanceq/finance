import { Box, CircularProgress, List, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { FilterInput } from "../components/ExchangePage/FilterInput"
import { MemoItem } from "../components/ExchangePage/MemoItem"

const countries = [
	"UAH",
	"AUD",
	"GBP",
	"BRL",
	"HUF",
	"USD",
	"EUR",
	"CNY",
	"AUD",
	"BGN",
	"BYN",
	"CAD",
	"INR",
]

const ExchangePage = () => {
	const [data, setData] = useState<[string, number][]>()
	const [base, setBase] = useState<string>("USD")
	const [count, setCount] = useState<number>(1)
	const [search, setSearch] = useState<string>("")

	useEffect(() => {
		fetch(
			`https://api.exchangerate.host/latest?base=${base}&amount=1&symbols=${countries.join(
				","
			)}`
		)
			.then((response) => response.json())
			.then((data) => {
				const entries: [string, number][] = Object.entries(data.rates)
				setData(entries)
			})
	}, [base])

	return (
		<>
			{data && data.length > 0 ? (
				<Box
					sx={{
						textAlign: "center",
						position: "relative",
						height: "100%",
					}}
				>
					<FilterInput
						base={base}
						setBase={setBase}
						count={count}
						setCount={setCount}
						data={data}
					/>
					<TextField
						type={"text"}
						value={search}
						placeholder='Start typing...'
						onChange={(e) => {
							const target = e.target as HTMLInputElement
							setSearch(target.value)
						}}
						variant={"filled"}
						fullWidth
						sx={{
							" input": {
								fontSize: "20px",
								height: "3em",
								flexGrow: 2,
								fontWeight: 800,
								color: "black",
							},
						}}
					/>
					<List
						sx={{
							overflow: "scroll",
							height:
								"calc(100% - 45px - 30px - 30px - 33px - 29px - 20px - 16px - 60px)",
						}}
					>
						{data && data.length > 0 ? (
							data
								?.filter(([name]) =>
									name.toLowerCase().includes(search.toLowerCase())
								)
								.map(([name, cost]) => {
									if (name === base) return null

									return (
										<MemoItem
											cost={cost}
											count={count}
											name={name}
											key={name}
										/>
									)
								})
						) : (
							<CircularProgress />
						)}
					</List>
				</Box>
			) : (
				<CircularProgress
					sx={{
						position: "absolute",
						top: "30%",
						left: "10%",
					}}
					value={50}
					size={"15rem"}
				/>
			)}
		</>
	)
}

export { ExchangePage }
