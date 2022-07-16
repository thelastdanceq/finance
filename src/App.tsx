import { createTheme, ThemeProvider } from "@mui/material"
import { Routes, Route } from "react-router-dom"
import HomeBody from "./components/HomePage/HomeBody"
import SecondHomePage from "./components/HomePage/SecondHomePage"
import StartHomePage from "./components/HomePage/StartHomePage"
import ThirdHomePage from "./components/HomePage/ThirdHomePage"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import MainPage from "./pages/MainPage"
import { useAppDispatch, useAppSelector } from "./hooks/redux"
import { loadUser } from "./store/slices/userSlice"
import NewStorage from "./pages/NewStorage"
import { getDatabase, onValue, ref } from "firebase/database"
import { loadCards } from "./store/slices/cardSlice"
import { NewPaymentPage } from "./pages/NewPaymentPage"
import { Transactions } from "./pages/Transactions"
import { MainLayout } from "./pages/MainLayout"
import StatPage from "./pages/StatPage/StatPage"
import { ExchangePage } from "./pages/ExchangePage"
import { StatPageLogic } from "./pages/StatPage/StatPageLogic"

const theme = createTheme({
	palette: {
		primary: { main: "#3B23F7", dark: "#523CF8", light: "#ffffff" },
		secondary: { main: "#F76654", light: "#F7DA23" },
	},
	components: {
		MuiContainer: {
			styleOverrides: {
				root: {
					padding: 0,
				},
			},
		},
		MuiMobileStepper: {
			styleOverrides: {
				root: {
					backgroundColor: "#3B23F7",
				},
				dot: {
					backgroundColor: "white",
				},
				dotActive: {
					backgroundColor: "#F7DA23",
				},
			},
		},
	},
})

function App() {
	const firebaseConfig = {
		apiKey: "AIzaSyBqJ8fwUBVSr00J6_5X8P4uB98EZgJ3Xwo",
		authDomain: "finance-d5c93.firebaseapp.com",
		projectId: "finance-d5c93",
		storageBucket: "finance-d5c93.appspot.com",
		messagingSenderId: "210855044221",
		databaseURL:
			"https://finance-d5c93-default-rtdb.europe-west1.firebasedatabase.app/",
		appId: "1:210855044221:web:2317be6e0839ef9bbe3d14",
	}

	const { storages } = useAppSelector((state) => state.card)
	initializeApp(firebaseConfig)
	const auth = getAuth()
	const dispatch = useAppDispatch()
	const { user } = useAppSelector((state) => state.user)
	const db = getDatabase()

	const AuthCheck = onAuthStateChanged(auth, (user) => {
		if (user) dispatch(loadUser(user))
	})
	useEffect(() => {
		AuthCheck()
	}, [AuthCheck, auth])

	useEffect(() => {
		onValue(
			ref(db, `users/${typeof user !== "string" && user.uid}`),
			(snapshot) => {
				const data = snapshot.val()
				dispatch(loadCards(data?.storages ? data.storages : {}))
			}
		)
	}, [db, dispatch, user])
	return (
		<div className='App'>
			<ThemeProvider theme={theme}>
				<Routes>
					<Route path='/home' element={<HomePage />}>
						<Route path='0' element={<StartHomePage />} />
						<Route path='1' element={<SecondHomePage />} />
						<Route path='2' element={<ThirdHomePage />} />
						<Route path='*' element={<HomeBody />} />
					</Route>
					<Route path='/main' element={<MainLayout />}>
						<Route path='hub' element={<MainPage />}>
							<Route path='newstorage' element={<NewStorage />} />
							<Route path='newpayment' element={<NewPaymentPage />} />
							<Route path='history/:cardid' element={<Transactions />} />
							<Route path='*' element={<HomeBody />} />
						</Route>
						<Route
							path='stats'
							element={
								Object.keys(storages).length !== 0 ? <StatPageLogic /> : null
							}
						></Route>
						<Route path='exchange' element={<ExchangePage />}></Route>
					</Route>
					<Route path='/register' element={<RegisterPage />} />
					<Route path='*' element={<HomeBody />} />
				</Routes>
			</ThemeProvider>
		</div>
	)
}

export default App
