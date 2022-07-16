import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { BrowserRouter, HashRouter } from "react-router-dom"
import "./index.css"
import "firebase/firestore"
import { Provider } from "react-redux"
import { store } from "./store/store"

const container = document.getElementById("root")!
const root = createRoot(container)

root.render(
	<React.StrictMode>
		<HashRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</HashRouter>
	</React.StrictMode>
)
