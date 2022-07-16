export interface IStorage {
    balance:number
    curren:string
    description:string
    name:string
    startBalance:number
    payments:Object
}

export interface IPayment{
    category: string,
    operation:  "+" | "-"
    time: string
    value: number
}
export interface ILogicProps {

    wallet:string ,
    setWallet:React.Dispatch<React.SetStateAction<string>>
    storages:Object
    data : {name:string , balance:number}[]
    curren : string 
}