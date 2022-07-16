import { Typography } from "@mui/material"


const StartHomePage = () => {

    return (
        <>
            <Typography
                variant="h2"
                component="div"
                sx={{
                    color: "white",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: "34px",
                    lineHeight: "41px",
                    marginBottom: "120px",
                }}
            >
                Следи за своими расходами и доходами
            </Typography>
        </>
    )
}

export default StartHomePage