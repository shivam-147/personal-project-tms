import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    title: "",
    subtitle: "",
    type: "success",
    visible: false
}

const toasSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        showToast: (state, action: PayloadAction<{ title: string; subtitle: string; type: string }>) => {
            state.title = action.payload.title;
            state.subtitle = action.payload.subtitle;
            state.type = action.payload.type;
            state.visible = true;
        },
        hideToast: (state) => {
            state.visible = false;
        }
    }
})

export const { showToast, hideToast } = toasSlice.actions;
export default toasSlice.reducer;
