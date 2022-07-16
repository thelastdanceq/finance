import { AppBar, Avatar, Box, Button, Toolbar } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../hooks/redux';

interface IProps {
    onClick: () => void;
}
export const Header = ({ onClick }: IProps) => {
    const { user } = useAppSelector((state) => state.user)

    return (
        <AppBar position='static' sx={{ zIndex: 100 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: "space-between" }} >
                <Button
                    variant='contained'
                    color="secondary"
                    onClick={onClick}>
                    Выйти
                </Button>
                <Box >
                    <Avatar src={typeof user !== "string" ? user!.photoURL! : ""} />
                </Box>
            </Toolbar>
        </AppBar>
    )
}