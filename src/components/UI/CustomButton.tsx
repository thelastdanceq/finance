import { Button } from '@mui/material'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import React from 'react'

type Props = {
    type?: "submit",
    handleClick?: () => void;
    children?: React.ReactNode;
}

const CustomButton = ({ handleClick, children, type }: Props) => {
    return (
        <Button
            fullWidth
            type={type || "button"}
            color="secondary"
            variant="contained"
            onClick={handleClick}
            sx={{
                marginTop: "36px",
                padding: "20px",
                borderRadius: "15px",
                display: "flex",
                justifyContent: "space-between"
            }}
        >
            {children}
            <ArrowCircleRightIcon />
        </Button>
    )
}

export default CustomButton