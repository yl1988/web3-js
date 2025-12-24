import { configureStore } from '@reduxjs/toolkit'

import EthersFunction from "./ethers-function"

export const store = configureStore({
    reducer: {
        // 在这里添加你的 reducers
        ethersFunction: EthersFunction,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
