import { Select, MenuItem, CircularProgress } from "@mui/material"
import React, { memo } from "react"

type Props = {
	base: string
	setBase: React.Dispatch<React.SetStateAction<string>>
	data: [string, number][]
}

export const ContrySelect = memo(({ base, setBase, data }: Props) => {
	return (
		<>
			{
				<Select
					defaultValue=''
					value={base}
					onChange={(e) => setBase(e.target.value)}
					sx={{
						display: "flex",
						justifyContent: "space-around",
						alignItems: "center",
						fontSize: "20px",
						flexGrow: 1,
						fontWeight: 800,
						color: "white",
					}}
				>
					{data && data.length > 0 ? (
						data.map(([name, value]) => {
							if (name[0] === "X") return null
							return (
								<MenuItem
									key={name}
									sx={{
										display: "flex",
										justifyContent: "space-around",
										alignItems: "center",
										fontSize: "20px",
									}}
									value={name}
								>
									{name}
								</MenuItem>
							)
						})
					) : (
						<CircularProgress />
					)}
				</Select>
			}
		</>
	)
})
