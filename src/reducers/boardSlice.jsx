import { createSlice } from '@reduxjs/toolkit'

export const boardSlice = createSlice({
  name: 'board',
  initialState: 0,
  reducers: {
    changeBoard: (state, action) => {
      return state = action.payload
    }
  },
})

export const { changeBoard } = boardSlice.actions

export default boardSlice.reducer