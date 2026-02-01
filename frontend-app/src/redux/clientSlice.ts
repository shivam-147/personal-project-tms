import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clients: [], 
}

const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        setClients: (state, action) => {
            state.clients = action.payload
        }
    }
})

export const { setClients } = clientSlice.actions
export default clientSlice.reducer