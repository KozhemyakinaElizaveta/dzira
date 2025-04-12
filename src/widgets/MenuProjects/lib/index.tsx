import { useToast } from '@chakra-ui/react'
import { getProjects, createProject } from 'entities/project/api'
import { setBoards } from 'entities/project/model/slice'
import { Board } from 'entities/project/model/types'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

export const useBoards = () => {
  const toast = useToast()
  const [projectsData, setProjectsData] = useState<Board[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsLoading(true)
    getProjects()
      .then((response) => {
        setProjectsData(response.data.data)
        dispatch(setBoards(response.data.data))
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
      .finally(() => {
        setIsLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createNewProject = async (projectData: {
    name: string
    description?: string
  }) => {
    try {
      setIsLoading(true)
      const response = await createProject(projectData)

      setProjectsData((prevProjects) => [
        ...prevProjects,
        {
          id: response.data.id,
          name: projectData.name,
          description: projectData.description || '',
          taskCount: 0,
        },
      ])

      toast({
        position: 'bottom-right',
        title: 'Успех',
        description: 'Проект успешно создан',
        status: 'success',
        duration: 5000,
        isClosable: true,
        variant: 'top-accent',
      })
    } catch {
      toast({
        position: 'bottom-right',
        title: 'Ошибка',
        description: 'Не удалось создать проект',
        status: 'error',
        duration: 9000,
        isClosable: true,
        variant: 'top-accent',
      })
    } finally {
      setIsLoading(false)
    }
  }

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

  return {
    ...data,
    isLoading,
    createNewProject,
  }
}
