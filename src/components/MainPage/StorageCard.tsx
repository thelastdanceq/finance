import { Box } from '@mui/material'
import React from 'react'
import { CustomText } from './CustomText'
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    storage: [
        left: string,
        right: { description: string, name: string, balance: number, curren: string }],
    handleOpen: (id: string) => void
    handleHistory: (id: string) => void
}

export const StorageCard = ({ storage, handleOpen, handleHistory }: Props) => {
    const [left, right] = storage;
    return (
        <Box onClick={() => handleHistory(left)}
            sx={{
                backgroundColor: "primary.main",
                borderRadius: "25px",
                margin: 0,
                minWidth: "80%",
                minHeight: "80%",
                display: "flex",
                marginRight: "20px",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "flex-start",
                padding: "10px 15px",
                boxShadow: 5
            }}
        >
            <Box>
                <CustomText children={right.name} color="primary.light" />
                <CustomText
                    weight={400}
                    size={"15px"}
                    height={"20px"}
                    children={right.description}
                    color="primary.light" />
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%"
            }}>
                <CustomText
                    size={"28px"}
                    children={`${String(right.balance)
                        } ${right.curren}`}
                    color="primary.light" />
                <DeleteIcon onClick={(e) => {
                    e.stopPropagation()
                    handleOpen(left)
                }} color="secondary" sx={{ width: "50px", height: "50px" }} />
            </Box>


        </Box>
    )
}