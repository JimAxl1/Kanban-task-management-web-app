import { createSlice, current } from '@reduxjs/toolkit'
import meme from '../data.json'

export const dataSlice = createSlice({
  name: 'data',
  initialState:  localStorage.getItem('boards') == null ? 
    meme.boards : JSON.parse(localStorage.getItem('boards')),//meme.boards,
  reducers: {
    addNewBoard: (state, action) => {
      const board = action.payload
      const columns = board.columns.map((item) => {
        return {name: item.name, tasks: []}
      })
      state.push({name: board.name, columns: columns})
    },

    changeSubTask: (state, action) => {
      const info = action.payload
      state[info.indexBoard].columns[info.indexColumn].tasks[info.indexTask].subtasks[info.indexSubtask].isCompleted = info.isCompleted
    },

    addNewTask: (state, action) => {
      const info = action.payload
      const arraySubtasks = info.subtasks.map((item) => {
        return {title: item.name, isCompleted: false}
      })
      state[info.indexBoard].columns[info.indexStatus].tasks.push({
        title: info.title,
        description: info.description,
        status: state[info.indexBoard].columns[info.indexStatus].name,
        subtasks: arraySubtasks
      })
    },

    changeStatusTask: (state, action) => {
      const info = action.payload
      state[info.indexBoard].columns[info.indexColumn].tasks[info.indexTask].status = info.indexStatus
      const modifiedTask = state[info.indexBoard].columns[info.indexColumn].tasks[info.indexTask]
      state[info.indexBoard].columns[info.indexStatus].tasks.push(modifiedTask)
      state[info.indexBoard].columns[info.indexColumn].tasks.splice(info.indexTask, 1)
    },

    editTask: (state, action) => {
      const info = action.payload
      const editedTask = {
        title: info.title,
        description: info.description,
        status: info.status,
        subtasks: info.subtasks
      }
      state[info.indexBoard].columns[info.indexColumn].tasks[info.indexTask] = editedTask
      if (info.indexColumn !== info.status){
        const modifiedTask = state[info.indexBoard].columns[info.indexColumn].tasks[info.indexTask]
        state[info.indexBoard].columns[info.status].tasks.push(modifiedTask)
        state[info.indexBoard].columns[info.indexColumn].tasks.splice(info.indexTask, 1)          
      }
    },

    editBoard: (state, action) => {
      const info = action.payload
      state[info.indexBoard].name = info.name
      const indexColumnsToDelete = []
      const editedColumns = info.columns.filter((item) => item.index !== null)

      for (let x=0; x<=state[info.indexBoard].columns.length - 1; x++){
        let founded = false
        editedColumns.map((item) => {
          if (item.index === x){
            founded = true
            state[info.indexBoard].columns[x].name = item.name
          }
        })
        if (founded === false){
          indexColumnsToDelete.push(x)
        }
      }

      indexColumnsToDelete.reverse()
      indexColumnsToDelete.map((item) => {
        state[info.indexBoard].columns.splice(item, 1)
      })
      const newColumns = info.columns.filter((item) => item.index === null)
      newColumns.map((item) => {
        state[info.indexBoard].columns.push({ name: item.name, tasks: [] })
      })
    },
    
    deleteTask: (state, action) => {
      const route = action.payload
      state[route.indexBoard].columns[route.indexColumn].tasks.splice(route.indexTask, 1)
    },

    deleteBoard: (state, action) => {
      const indexBoard = action.payload
      state.splice(indexBoard, 1)
      console.log(current(state))
    }
  },
})

export const { addNewBoard, changeSubTask, addNewTask, changeStatusTask, editTask, deleteTask, deleteBoard, editBoard } = dataSlice.actions

export default dataSlice.reducer