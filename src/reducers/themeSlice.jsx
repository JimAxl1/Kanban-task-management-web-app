import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: 'light',
  reducers: {
    changeTheme: (state) => {
      return state === 'light' ? 'dark' : 'light'
    }
  },
})

export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer