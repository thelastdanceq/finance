import { Box, TextField } from "@mui/material"
import React, { memo } from "react"
import { ContrySelect } from "./ContrySelect"
import { CountryAvatar } from "./CountryAvatar"

export const FilterInput = memo(
	({
		count,
		setCount,
		base,
		setBase,
		data,
	}: {
		count: number
		setCount: React.Dispatch<React.SetStateAction<number>>
		base: string
		setBase: React.Dispatch<React.SetStateAction<string>>
		data: [string, number][]
	}) => {
		return (
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					marginTop: "10px",
					backgroundColor: "blue",
					borderRadius: "10px",
					padding: "10px",
					color: "white",
				}}
			>
				<CountryAvatar base={base} size={"64"} />
				<ContrySelect base={base} setBase={setBase} data={data} />
				<TextField
					type={"number"}
					value={count}
					onChange={(e) => {
						const target = e.target as HTMLInputElement
						if (target.value[0] === "0") {
							target.value = target.value.slice(1)
						}
						setCount(+target.value)
					}}
					sx={{
						" input": {
							fontSize: "20px",
							height: "3em",
							flexGrow: 2,
							fontWeight: 800,
							color: "white",
						},
					}}
				/>{" "}
			</Box>
		)
	}
)
