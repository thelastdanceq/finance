import { Typography } from '@mui/material'
import React from 'react'
type Props = {
    children: string | JSX.Element,
    color?: string | "primary",
    weight?: number,
    size?: string,
    height?: string,
    alignSelf?: string

}

function CustomText({ children, color, weight, size, height, alignSelf }: Props) {
    return (
        <Typography color={color || "primary"}
            sx={{
                fontStyle: "normal",
                fontWeight: weight || 700,
                fontSize: size || "1em",
                lineHeight: height || "1em",
                alignSelf
            }}>
            {children}
        </Typography>
    )
}

export { CustomText }