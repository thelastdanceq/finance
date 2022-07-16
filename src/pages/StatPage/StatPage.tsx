import { MenuItem, Select } from "@mui/material"
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts"
import { ILogicProps } from "./types"

const StatPage: React.FC<ILogicProps> = ({
	curren,
	data,
	setWallet,
	storages,
	wallet,
}) => {
	return (
		<>
			<Select
				defaultValue={wallet}
				value={wallet}
				fullWidth
				sx={{
					marginTop: "50px",
					textAlign: "center",
					fontSize: "1.3em",
				}}
				onChange={(e) => setWallet(e.target.value)}
			>
				{Object.entries(storages).map(([id, storage]) => {
					return (
						<MenuItem key={id} value={storage.name}>
							{storage.name}
						</MenuItem>
					)
				})}
			</Select>
			<ResponsiveContainer width='100%' height='75%'>
				<AreaChart
					width={500}
					height={400}
					data={data}
					margin={{
						top: 50,
						right: 50,
						left: 0,
						bottom: 0,
					}}
				>
					<XAxis dataKey='name' />
					<Tooltip
						separator=''
						formatter={(value: number) => `${value} ${curren}`}
					/>
					<Area
						fill='#523CF8'
						fillOpacity={0.15}
						strokeWidth='5px'
						stroke='#523CF8'
						type='monotone'
						dataKey='balance'
					></Area>
				</AreaChart>
			</ResponsiveContainer>
		</>
	)
}

export default StatPage
