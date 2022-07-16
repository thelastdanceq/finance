import { ListItemAvatar } from "@mui/material"
import React, { memo } from "react"

const MemoizedListItemAvatar: React.FC<{ name: string }> = memo(({ name }) => (
	<ListItemAvatar>
		<img
			src={`https://countryflagicons.com/FLAT/64/${name.slice(0, 2)}.png`}
			style={{ borderRadius: "50%" }}
			alt={`${name}'s  avatar`}
		/>
	</ListItemAvatar>
))

export default MemoizedListItemAvatar
