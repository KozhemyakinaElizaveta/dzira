import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Board, ProjectState, Task } from './types'

const initialState: ProjectState = {
  currentBoard: null,
  boards: [],
  tasks: [],
  currentTask: null,
}

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setBoards: (state, action: PayloadAction<Board[]>) => {
      state.boards = action.payload
    },

    setCurrentBoard: (state, action: PayloadAction<Board | null>) => {
      state.currentBoard = action.payload
    },

    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload
    },

    setCurrentTask: (state, action: PayloadAction<Task | null>) => {
      state.currentTask = action.payload
    },

    updateTask: (
      state,
      action: PayloadAction<{ taskId: number; updates: Partial<Task> }>
    ) => {
      const { taskId, updates } = action.payload
      const task = state.tasks.find((task) => task.id === taskId)
      if (task) {
        Object.assign(task, updates)
      }
    },

    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload)

      if (state.currentBoard?.id === action.payload.boardId) {
        state.currentBoard.taskCount += 1
      }
    },
  },
})

export const {
  setBoards,
  setCurrentBoard,
  setTasks,
  setCurrentTask,
  updateTask,
  addTask,
} = projectSlice.actions

export default projectSlice.reducer
