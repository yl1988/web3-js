import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BlogState {
    contractAddress: string
}

const initialState: BlogState = {
    contractAddress: '',
}

export const ethersFunctionSlice = createSlice({
    name: 'ethersFunction',
    initialState,
    reducers: {
        updateContractAddress: {
            reducer: (state, action: PayloadAction<string>) => {
                state.contractAddress = action.payload
            },
            prepare: (contractAddress: string) => ({
                payload: contractAddress
            })
        },
    },
})

export const { updateContractAddress } = ethersFunctionSlice.actions
export default ethersFunctionSlice.reducer