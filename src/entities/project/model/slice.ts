import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CurrentProject, Project, Task } from './types'

const MOCK_PROJECTS: Array<CurrentProject> = [
  {
    title: 'Project A',
    icon: 1,
    id: 1,
    section_ids: [
      { section_id: 1, name: 'To Do', position: 1 },
      { section_id: 2, name: 'In Progress', position: 2 },
      { section_id: 3, name: 'Done', position: 3 },
    ],
    tasks: [
      {
        id: '1',
        section_id: 1,
        name: 'Task 1',
        description: 'Description for Task 1',
        deadline: '2024-01-01',
        finished: false,
        tags: ['bug'],
        project: 'Project A',
        number: 1,
        tag: 'bug',
        date: '01.01.2024',
        last_name: 'Иванов',
        first_name: 'Иван',
      },
      {
        id: '2',
        section_id: 3,
        name: 'Task 2',
        description: 'Description for Task 2',
        deadline: '2024-04-01',
        finished: true,
        tags: ['bug'],
        project: 'Project A',
        number: 2,
        tag: 'bug',
        date: '01.04.2024',
        last_name: 'Иванов',
        first_name: 'Иван',
      },
    ],
  },
  {
    title: 'Project B',
    icon: 3,
    id: 2,
    section_ids: [
      { section_id: 1, name: 'To Do', position: 1 },
      { section_id: 2, name: 'In Progress', position: 2 },
      { section_id: 3, name: 'Done', position: 3 },
    ],
    tasks: [
      {
        id: '12',
        section_id: 2,
        name: 'Task',
        description: 'Description for Task',
        deadline: '2024-05-25',
        finished: false,
        tags: ['backend'],
        project: 'Project B',
        number: 1,
        tag: 'backend',
        date: '01.01.2024',
        last_name: 'Иванов',
        first_name: 'Иван',
      },
      {
        id: '22',
        section_id: 2,
        name: 'Task new',
        description: 'Description for Task new',
        deadline: '2024-04-10',
        finished: false,
        tags: ['frontend'],
        project: 'Project B',
        number: 2,
        tag: 'frontend',
        date: '01.04.2024',
        last_name: 'Иванов',
        first_name: 'Иван',
      },
    ],
  },
]

const initialState: Project = {
  currentProject: MOCK_PROJECTS[0],
  projects: MOCK_PROJECTS, 
}

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    addProjects: (state, action: PayloadAction<Array<CurrentProject>>) => {
      state.projects = action.payload
    },
    setCurrentProject: (state, action: PayloadAction<CurrentProject>) => {
      state.currentProject = action.payload
    },
    addProject: (state, action: PayloadAction<{ title: string; icon: number | null }>) => {
      const { title, icon } = action.payload
      const newProject: CurrentProject = {
        title,
        icon,
        id: Date.now(),
        tasks: [],
        section_ids: [
          { section_id: 1, name: 'To Do', position: 1 },
          { section_id: 2, name: 'In Progress', position: 2 },
          { section_id: 3, name: 'Done', position: 3 },
        ],
      }
      state.projects.push(newProject)
    },
    addTaskToProject: (
      state,
      action: PayloadAction<{ projectId: number; task: Task }>
    ) => {
      const { projectId, task } = action.payload;
      const project = state.projects.find((p) => p.id === projectId);
      if (project) {
        project.tasks = [...(project.tasks || []), task];

        if (state.currentProject?.id === projectId) {
          state.currentProject = project;
        }
      }
    },
    updateProjectTitle: (
      state,
      action: PayloadAction<{ projectId: number; newTitle: string }>
    ) => {
      const { projectId, newTitle } = action.payload;

      const project = state.projects.find((p) => p.id === projectId);
      if (project) {
        project.title = newTitle;
      }

      if (state.currentProject?.id === projectId) {
        state.currentProject = { ...state.currentProject, title: newTitle };
      }
    },
    updateTaskInProject: (
      state,
      action: PayloadAction<{
        projectId: number | null;
        taskId: string; 
        updates: Partial<Task>;
      }>
    ) => {
      const { projectId, taskId, updates } = action.payload;

      const project = state.projects.find((p) => p.id === projectId);
      if (!project || !project.tasks) return;

      const task = project.tasks.find((t) => t.id === taskId);
      if (task) {
        Object.assign(task, updates);

        project.tasks = [...project.tasks];

        if (state.currentProject?.id === projectId) {
          state.currentProject = { ...project }; 
        }
      }
    },
    updateTaskSectionId: (state, action: PayloadAction<{ taskId: string; newSectionId: number }>) => {
      const { taskId, newSectionId } = action.payload;

      const currentProject = state.currentProject;
      if (!currentProject || !currentProject.tasks) return;

      const task = currentProject.tasks.find((task) => task.id === taskId);
      if (task) {

        task.section_id = newSectionId;

        const projectInProjects = state.projects.find((p) => p.id === currentProject.id);
        if (projectInProjects) {
          projectInProjects.tasks = [...currentProject.tasks];
          state.currentProject = { ...currentProject }; 
        }
      }
    },
  },
})

export const {
  setCurrentProject,
  addProjects,
  addProject,
  addTaskToProject,
  updateTaskInProject,
  updateTaskSectionId,
  updateProjectTitle
} = projectSlice.actions

export default projectSlice.reducer