import { MenuItem, Select } from "@mui/material"
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts"
import { elementSelectStyle, graphsMargins } from "../styles/styles"
import { ILogicProps } from "../types/types"

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
				sx={elementSelectStyle}
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
				<AreaChart width={600} height={400} data={data} margin={graphsMargins}>
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
