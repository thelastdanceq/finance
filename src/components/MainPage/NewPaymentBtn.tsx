import { Box, Button } from '@mui/material'
import React from 'react'
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


type Props = {
    children: JSX.Element | string,
    onClick?: () => void,
    disabled: boolean
}

const NewPaymentBtn = ({ children, onClick, disabled, }: Props) => {
    return (
        <Button variant='outlined'
            disabled={disabled}
            onClick={onClick} sx={{
                padding: "15px",
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "17px",
                lineHeight: "21px",
            }}>
            <Box sx={{
                backgroundColor: "secondary.main",
                borderRadius: "10px",
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                padding: "15px",
            }}>
                <EuroSymbolIcon sx={{ color: "white" }} />
            </Box>
            {children}
            <ArrowForwardIcon />

        </Button>
    )
}

export default NewPaymentBtn