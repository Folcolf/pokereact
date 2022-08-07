import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
  value: !!JSON.parse(localStorage.getItem("dark") ?? "false")
}
export const darkModeSlice = createSlice({
  name: "dark",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    changeMode: (state, action: PayloadAction<boolean>) => {
      localStorage.setItem("dark", JSON.stringify(action.payload))
      state.value = action.payload
    }
  }
})

export const { changeMode } = darkModeSlice.actions

export default darkModeSlice.reducer
