import { Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import CustomButton from "../UI/CustomButton";

const ThirdHomePage = () => {
    const navigator = useNavigate()
    const handleClick = () => {
        navigator('/register')
    }
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
                    marginBottom: "calc(120px - 36px - 30px)",
                }}
            >
                Начинай прямо сейчас!
                <CustomButton
                    handleClick={handleClick}
                >
                    Стартуем
                </CustomButton>
            </Typography>
        </>
    )
}

export default ThirdHomePage