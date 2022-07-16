import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface ICardState {
    storages: Object,
}
const initialState: ICardState = {
    storages: {},
};

export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        loadCards: (state: any, action: PayloadAction<Object>) => {
            state.storages = action.payload
        }
    },
})

export const { loadCards } = cardSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectModal = (state: RootState) => state.card

export default cardSlice.reducer