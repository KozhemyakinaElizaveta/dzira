import { useToast } from '@chakra-ui/react'
import { getTasksForBoard } from 'entities/project/api'
import {
  selectAllBoards,
  selectCurrentBoard,
} from 'entities/project/model/selectors'
import { setCurrentBoard } from 'entities/project/model/slice'
import { updateTaskStatusApi } from 'entities/task/api'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export interface Task {
  id: number
  title: string
  description: string
  boardName: string
  boardId: number
  deadline?: string
  priority: 'Low' | 'Medium' | 'High'
  status: 'Backlog' | 'InProgress' | 'Done'
  assignee: {
    avatarUrl: string
    email: string
    fullName: string
    id: number
  }
}

export const useBoardTasks = () => {
  const toast = useToast()
  const [tasks, setTasks] = useState<Task[]>([])
  const [update, setUpdate] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const currentProject = useSelector(selectCurrentBoard)
  const projects = useSelector(selectAllBoards)
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    const selectedProject = projects.find((p) => p.id === Number(id))
    if (selectedProject) {
      dispatch(setCurrentBoard(selectedProject))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects])

  useEffect(() => {
    if (!currentProject) return

    setIsLoading(true)
    getTasksForBoard(currentProject.id)
      .then((response) => {
        setTasks(response.data.data)
        setUpdate(false)
      })
      .catch(() => {
        setUpdate(false)
        toast({
          position: 'bottom-right',
          title: 'Ошибка',
          description: 'Не удалось получить задачи',
          status: 'error',
          duration: 9000,
          isClosable: true,
          variant: 'top-accent',
        })
      })
      .finally(() => {
        setIsLoading(false)
        setUpdate(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProject, update])

  const updateTaskStatus = (
    taskId: number,
    newStatus: 'Backlog' | 'InProgress' | 'Done'
  ) => {
    if (!taskId) {
      toast({
        position: 'bottom-right',
        title: 'Ошибка',
        description: 'ID задачи не указан',
        status: 'error',
        duration: 5000,
        isClosable: true,
        variant: 'top-accent',
      })
      return
    }

    const options = {
      status: newStatus,
    }

    updateTaskStatusApi(taskId, options)
      .then(({ status }) => {
        if (status === 200) {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === taskId ? { ...task, status: newStatus } : task
            )
          )

          toast({
            position: 'bottom-right',
            title: 'Успех',
            description: 'Статус задачи успешно обновлен',
            status: 'success',
            duration: 5000,
            isClosable: true,
            variant: 'top-accent',
          })
        }
      })
      .catch(() => {
        toast({
          position: 'bottom-right',
          title: 'Ошибка',
          description: 'Произошла ошибка при обновлении статуса задачи',
          status: 'error',
          duration: 5000,
          isClosable: true,
          variant: 'top-accent',
        })
      })
  }

  const data = useMemo(() => {
    if (!tasks || tasks.length === 0) {
      return {
        totalTasks: 0,
        tasks: [],
      }
    }
    return {
      totalTasks: tasks.length,
      tasks: tasks.map((task) => ({
        id: task.id,
        boardId: task.boardId,
        boardName: task.boardName,
        title: task.title,
        description: task.description,
        deadline: task.deadline || 'Без дедлайна',
        priority: task.priority,
        status: task.status,
        assignee: task.assignee,
      })),
    }
  }, [tasks])

  return {
    ...data,
    isLoading,
    updateTaskStatus,
    setUpdate,
  }
}
