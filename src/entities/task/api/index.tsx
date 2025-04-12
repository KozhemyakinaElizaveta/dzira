import axios from 'shared/api/axios'

export function getTasks() {
  return axios.get(`/api/v1/tasks`, {
    withCredentials: true,
  })
}

export function createTask(data: {
  assigneeId: number
  boardId: number
  description: string
  title: string
  priority?: 'Low' | 'Medium' | 'High'
}) {
  return axios.post(`/api/v1/tasks/create`, data, {
    withCredentials: true,
  })
}

export function updateTask(
  taskId: number,
  data: {
    assigneeId: number
    description: string
    title: string
    priority?: 'Low' | 'Medium' | 'High'
    status?: 'Backlog' | 'InProgress' | 'Done'
  }
) {
  return axios.put(`/api/v1/tasks/update/${taskId}`, data, {
    withCredentials: true,
  })
}

export const updateTaskStatusApi = (
  taskId: number,
  options: { status: string }
) => {
  return axios.put(`/api/v1/tasks/updateStatus/${taskId}`, options, {
    withCredentials: true,
  })
}
