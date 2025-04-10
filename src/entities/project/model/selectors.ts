import { RootState } from 'shared/config/redux/store'

export const selectCurrentProject = (state: RootState) =>
  state.project.currentProject

export const selectCurrentTask = (state: RootState) =>
  state.project.currentTask

export const selectAllProjects = (state: RootState) => state.project.projects

export const selectTasksForCurrentProject = (state: RootState) =>
  state.project.currentProject.tasks || []