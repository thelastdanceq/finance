import { Box } from '@mui/material'
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { CustomText } from './CustomText';
import { useAppSelector } from '../../hooks/redux';
import { useParams } from 'react-router-dom';

function TransItem({ operation, category, time, value, }: { category: string, operation: string, time: string, value: number }) {
    const { storages } = useAppSelector(state => state.card)
    const { cardid } = useParams();

    const getCurrency = (storages: any, id: string) => {
        // @ts-ignore
        return Object.entries(storages).filter(entry => entry[0] === id)[0][1].curren
    }
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
        }}>
            <Box sx={{
                backgroundColor: 'orange',
                padding: "5px",
                borderRadius: "15px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <PriceChangeIcon sx={{
                    width: "40px",
                    height: "40px",
                    margin: "0 auto",
                }} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, paddingLeft: "20px" }}>
                <CustomText size='1.3em' >{`${category}`}</CustomText>
                <CustomText color='#C4C4C4'>{`${new Date(time).getDate()}-${new Date(time).getMonth() + 1 >= 10 ? new Date(time).getMonth() + 1 : "0" + (new Date(time).getMonth() + 1)}-${new Date(time).getFullYear()}`}</CustomText  >
            </Box>
            <CustomText size='1.2em' color={operation === "+" ? "primary" : "secondary"}>{operation + ' ' + String(value) + "  " + getCurrency(storages, cardid!)}</CustomText  >
        </Box>
    )
}

export default TransItem