import { useFormik } from 'formik'
import { UseDisclosureReturn, useToast } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTask, updateTask } from 'entities/task/api'
import { selectCurrentBoard } from 'entities/project/model/selectors'
import { getProjects, getUsers } from 'entities/project/api'
import { User } from 'entities/project/model/types'
import { GetBoardsResponse } from 'widgets/Boards/lib'
import { useBoardTasks } from 'widgets/Board/lib'
import { useNavigate } from 'react-router-dom'
import { setCurrentBoard } from 'entities/project/model/slice'

export interface CreateTaskRequest {
  assigneeId: number
  boardId: number
  description: string
  priority?: 'Low' | 'Medium' | 'High'
  title: string
  status: 'Backlog' | 'InProgress' | 'Done'
  taskId?: number
}

export interface UpdateTaskRequest extends CreateTaskRequest {
  taskId: number
}

export interface FormValues extends CreateTaskRequest {
  deadline?: string
  errorOccurred?: boolean
}

export const useCreateForm = (
  type: 'create' | 'edit',
  onClose: UseDisclosureReturn['onClose'],
  taskId?: number
) => {
  const toast = useToast()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentBoard = useSelector(selectCurrentBoard)
  const [users, setUsers] = useState<User[]>([])
  const { setUpdate } = useBoardTasks()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers()
        setUsers(response.data.data)
      } catch (error) {
        console.error('Ошибка при получении пользователей:', error)
      }
    }

    fetchUsers()
  }, [])

  const [projectsData, setProjectsData] = useState<GetBoardsResponse[]>([])

  useEffect(() => {
    getProjects()
      .then((response) => {
        setProjectsData(response.data.data)
      })
      .catch(() => {
        toast({
          position: 'bottom-right',
          title: 'Ошибка',
          description: 'Не удалось получить проекты',
          status: 'error',
          duration: 9000,
          isClosable: true,
          variant: 'top-accent',
        })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const data = useMemo(() => {
    if (!projectsData || projectsData.length === 0) {
      return {
        totalProjects: 0,
        projects: [],
      }
    }
    return {
      totalProjects: projectsData.length,
      projects: projectsData.map((project) => ({
        id: project.id,
        name: project.name,
        description: project.description,
        taskCount: project.taskCount,
      })),
    }
  }, [projectsData])

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {}

    if (!values.title) {
      errors.title = 'Название задачи обязательно'
    }

    if (!values.description) {
      errors.description = 'Описание задачи обязательно'
    }

    return errors
  }

  const submitCreate = (values: FormValues) => {
    if (!currentBoard) {
      toast({
        position: 'bottom-right',
        title: 'Ошибка',
        description: 'Текущая доска не выбрана',
        status: 'error',
        duration: 5000,
        isClosable: true,
        variant: 'top-accent',
      })
      return
    }

    const options: CreateTaskRequest = {
      assigneeId: values.assigneeId,
      boardId: values.boardId,
      description: values.description,
      title: values.title,
      priority: values.priority,
      status: 'Backlog',
    }

    createTask(options)
      .then(({ status }) => {
        if (status === 200) {
          const selectedProject = projectsData.find(
            (p) => p.id === formik.values.boardId
          )
          if (selectedProject) {
            dispatch(setCurrentBoard(selectedProject))
            navigate(`/board/${formik.values.boardId}`)
          }
          setUpdate(true)
          toast({
            position: 'bottom-right',
            title: 'Успех',
            description: 'Задача успешно создана',
            status: 'success',
            duration: 5000,
            isClosable: true,
            variant: 'top-accent',
          })
          onClose()
          formik.resetForm()
        }
      })
      .catch(() => {
        toast({
          position: 'bottom-right',
          title: 'Ошибка',
          description: 'Произошла ошибка при создании задачи',
          status: 'error',
          duration: 5000,
          isClosable: true,
          variant: 'top-accent',
        })
      })
  }

  const submitUpdate = (values: FormValues) => {
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

    const options: UpdateTaskRequest = {
      assigneeId: values.assigneeId,
      boardId: values.boardId,
      description: values.description,
      title: values.title,
      priority: values.priority,
      taskId: taskId,
      status: values.status,
    }

    updateTask(taskId, options)
      .then(({ status }) => {
        if (status === 200) {
          const selectedProject = projectsData.find(
            (p) => p.id === formik.values.boardId
          )
          if (selectedProject) {
            dispatch(setCurrentBoard(selectedProject))
            navigate(`/board/${formik.values.boardId}`)
          }
          setUpdate(true)
          toast({
            position: 'bottom-right',
            title: 'Успех',
            description: 'Задача успешно обновлена',
            status: 'success',
            duration: 5000,
            isClosable: true,
            variant: 'top-accent',
          })
          onClose()
          formik.resetForm()
        }
      })
      .catch(() => {
        toast({
          position: 'bottom-right',
          title: 'Ошибка',
          description: 'Произошла ошибка при обновлении задачи',
          status: 'error',
          duration: 5000,
          isClosable: true,
          variant: 'top-accent',
        })
      })
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      description: '',
      assigneeId: -1,
      boardId: currentBoard?.id || -1,
      priority: undefined,
      deadline: '',
      errorOccurred: false,
      status: 'Backlog',
      taskId: undefined,
    },
    validate,
    onSubmit: (values) => {
      if (type === 'create') {
        submitCreate(values)
      } else if (type === 'edit' && taskId) {
        submitUpdate(values)
      }
    },
  })

  return { formik, users, ...data }
}
