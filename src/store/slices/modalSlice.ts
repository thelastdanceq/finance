import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface InewStorageState {
    newStorageModal: boolean
}
const initialState: InewStorageState = {
    newStorageModal: false
};

export const newStorageSlice = createSlice({
    name: 'newStorageModal',
    initialState,
    reducers: {
        changeModal: (state: any, action: PayloadAction<boolean>) => {
            state.newStorageModal = action.payload
        }
    },
})

export const { changeModal } = newStorageSlice.actions

export const selectModal = (state: RootState) => state.newStorageModal

export default newStorageSlice.reducer