import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    city: null,
}

const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        assignCity(state, action) {
            state.city = action.payload.city
        },
        removeCity(state) {
            state.city = null
        },
    },
})

export const {assignCity, removeCity} = citySlice.actions;

export default citySlice.reducer;