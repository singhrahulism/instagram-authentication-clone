import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        CHANGE_LOADING: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { CHANGE_LOADING } = loadingSlice.actions

export default loadingSlice.reducer