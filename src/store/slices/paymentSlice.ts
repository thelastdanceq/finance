import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface IPaymentsState {
    payments: boolean | string;
}
const initialState: IPaymentsState = {
    payments: false
};

export const paymentsSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        loadPayments: (state: any, action: PayloadAction<boolean | string>) => {
            state.payments = action.payload
        }
    },
})

export const { loadPayments } = paymentsSlice.actions

export const selectModal = (state: RootState) => state.payments

export default paymentsSlice.reducer