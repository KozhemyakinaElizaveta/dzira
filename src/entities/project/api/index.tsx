import axios from 'shared/api/axios'

export function getProjects() {
  return axios.get(`/api/v1/boards`, {
    withCredentials: true,
  })
}

export function getTeamUsers(teamId: number) {
  return axios.get(`/api/v1/teams/${teamId}`, {
    withCredentials: true,
  })
}

export function getUsers() {
  return axios.get(`/api/v1/users`, {
    withCredentials: true,
  })
}

export function createProject(projectData: {
  name: string
  description?: string
}) {
  return axios.post(`/api/v1/boards`, projectData, {
    withCredentials: true,
  })
}

export function getTasksForBoard(boardId: number) {
  return axios.get(`/api/v1/boards/${boardId}`, {
    withCredentials: true,
  })
}
