export interface Task {
  id: string
  section_id: number
  name: string
  description: string
  deadline: string
  finished: boolean
  tags: Array<string>
  project: string 
  number: number 
  tag: string 
  date: string 
  last_name: string 
  first_name: string
  priority?: string
}

export interface CurrentProject {
  title: string
  icon: number | null
  id: number | null
  section_ids?: Array<{
    section_id: number
    name: string
    position: number
  }>
  tasks?: Array<Task> 
}

export interface Project {
  currentProject: CurrentProject
  projects: Array<CurrentProject>
}