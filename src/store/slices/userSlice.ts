import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'
import type { RootState } from '../store'

interface IuserState {
    user: User | string
}
const initialState: IuserState = {
    user: "none"
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loadUser: (state: any, action: PayloadAction<User | string>) => {
            state.user = action.payload
        }
    },
})

export const { loadUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer