import { Avatar } from "@mui/material"
import { memo } from "react"

export const CountryAvatar: React.FC<{ base: string; size: string }> = memo(
	({ base, size }) => {
		return (
			<Avatar
				variant='square'
				sx={{ width: "64px", flexGrow: 1 }}
				src={`https://www.countryflagicons.com/FLAT/${size}/${base.slice(
					0,
					2
				)}.png`}
			/>
		)
	}
)
