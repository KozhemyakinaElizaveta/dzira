import { RootState } from 'shared/config/redux/store'

// Селектор для получения текущей доски (проекта)
export const selectCurrentBoard = (state: RootState) =>
  state.project.currentBoard

// Селектор для получения всех досок
export const selectAllBoards = (state: RootState) => state.project.boards

// Селектор для получения текущей задачи
export const selectCurrentTask = (state: RootState) => state.project.currentTask

// Селектор для получения всех задач
export const selectAllTasks = (state: RootState) => state.project.tasks

// Селектор для получения задач текущей доски
export const selectTasksForCurrentBoard = (state: RootState) => {
  const currentBoard = selectCurrentBoard(state)
  const allTasks = selectAllTasks(state)

  // Фильтруем задачи по ID текущей доски
  return currentBoard
    ? allTasks.filter((task) => task.boardId === currentBoard.id)
    : []
}
