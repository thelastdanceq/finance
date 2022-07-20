import { useState } from "react"
import { useAppSelector } from "../../../hooks/redux"
import { getData, getFirstObjectName } from "../helpers/helpers"
import StatPage from "../view/StatPage"
import { IStorage } from "../types/types"

const StatPageLogic = () => {
	const { storages } = useAppSelector((state) => state.card)
	const [currentStorage, setCurrentStorage] = useState(
		getFirstObjectName(storages)
	)
	const storageEntries: [string, IStorage][] = Object.entries(storages)
	const storageNamePair = storageEntries.filter(([id, data]) => {
		return data.name === currentStorage
	})[0]

	const [, storageData] = storageNamePair
	const { curren: currency, payments, startBalance } = storageData

	return (
		<StatPage
			curren={currency}
			setWallet={setCurrentStorage}
			wallet={currentStorage}
			storages={storages}
			data={getData(payments ? payments : {}, startBalance)}
		/>
	)
}

export { StatPageLogic }
