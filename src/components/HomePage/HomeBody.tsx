import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const HomeBody = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate("/home")
    }, [])
    return (
        <>
        </>
    )
}

export default HomeBody