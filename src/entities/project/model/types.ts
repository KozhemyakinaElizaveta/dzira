export interface AssigneeUserForTask {
  avatarUrl: string
  email: string
  fullName: string
  id: number
}

export interface Task {
  assignee: AssigneeUserForTask
  boardId: number
  boardName: string
  description: string
  id: number
  priority: 'Low' | 'Medium' | 'High'
  status: 'Backlog' | 'InProgress' | 'Done'
  title: string
}

export interface Board {
  description: string
  id: number
  name: string
  taskCount: number
}

export interface ProjectState {
  currentBoard: Board | null
  boards: Board[]
  tasks: Task[]
  currentTask: Task | null
}

export interface User {
  avatarUrl: string
  description: string
  email: string
  fullName: string
  id: number
  tasksCount: number
  teamId: number
  teamName: string
}

export interface GetUsersResponse {
  users: User[]
}
