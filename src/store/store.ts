import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import newStorageReducer from './slices/modalSlice'
import cardReducer from './slices/cardSlice'
import paymentsReducer from './slices/paymentSlice'



export const store = configureStore({
    reducer: {
        user: userReducer,
        newStorageModal: newStorageReducer,
        card: cardReducer,
        payments: paymentsReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch