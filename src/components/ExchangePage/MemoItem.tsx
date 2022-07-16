import { ListItem, ListItemText } from "@mui/material"
import React, { memo } from "react"
import { CustomText } from "../MainPage/CustomText"
import MemoizedListItemAvatar from "./MemoizedAvatar"

export const MemoItem: React.FC<{ name: string; cost: number; count: number }> =
	memo(({ cost, name, count }) => (
		<ListItem
			sx={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				textAlign: "center",
				zIndex: 0,
			}}
		>
			<MemoizedListItemAvatar name={name} />
			<ListItemText>
				<CustomText size='20px'>{`${name}`}</CustomText>
			</ListItemText>
			<ListItemText sx={{}}>
				<CustomText color='secondary.main'>
					{`${cost ? (cost * count).toFixed(2) : 0}`}
				</CustomText>
			</ListItemText>
		</ListItem>
	))
