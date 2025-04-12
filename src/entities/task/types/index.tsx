export interface CreateTask {
  name: string
  description?: string
  deadline?: string
  section_id: number
  created_by: number | null
  priority: string | null
  executor_id: number | null
  created_at: string | null
  finished: boolean | null
  finished_at: string | null
  completion_time: number | null
  tags: string[] | null
}
