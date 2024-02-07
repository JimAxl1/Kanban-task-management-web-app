import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../reducers/themeSlice'
import dataReducer from '../reducers/dataSlice'
import boardReducer from '../reducers/boardSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    data: dataReducer,
    board: boardReducer,
  },
})