import { IPayment, IStorage } from "./types"

export const getData = (paymentsObject: Object, start: number) => {
	// console.log(paymentsObject,start);
	
	let timeSum = start
	const paymentsArray: IPayment[] = Object.values(paymentsObject)
	const res = paymentsArray.reduce(
		(resultArray, paymentObject) => {
			timeSum =
				paymentObject.operation === "+"
					? timeSum + paymentObject.value
					: timeSum - paymentObject.value
			return [...resultArray, { balance: timeSum, name:`${new Date(paymentObject.time).getDate()}-${new Date(paymentObject.time).getMonth() + 1 > 10 ? new Date(paymentObject.time).getMonth() + 1 : `0${ new Date(paymentObject.time).getMonth() + 1}`}`}]
		},
		[{ 'name': "Карта была создана", balance: start }]
	)
	return res
}

export const getFirstObjectName = (storagesObject : Object ) => {
	const storagesArray = Object.values(storagesObject)
	if(storagesArray.length === 0 ) return ''
	const firstObject:IStorage = storagesArray[0]
	return firstObject.name
}
export const checkStoragesNOTEmpty = (obj: Object) =>!!(Object.entries(obj).length !== 0)
