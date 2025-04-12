import { useToast } from '@chakra-ui/react'
import { Task } from 'entities/project/model/types'
import { getTasks } from 'entities/task/api'
import { useEffect, useMemo, useState } from 'react'

export const useIssues = () => {
  const toast = useToast()
  const [issuesData, setIssuesData] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    getTasks()
      .then((response) => {
        setIssuesData(response.data.data)
      })
      .catch((error) => {
        console.error('Ошибка при получении задач:', error)
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
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const data = useMemo(() => {
    if (!issuesData || issuesData.length === 0) {
      return {
        totalIssues: 0,
        issues: [],
      }
    }

    return {
      totalIssues: issuesData.length,
      issues: issuesData.map((issue) => ({
        id: issue.id,
        title: issue.title,
        description: issue.description,
        priority: issue.priority,
        status: issue.status,
        assignee: issue.assignee,
        boardId: issue.boardId,
        boardName: issue.boardName,
      })),
    }
  }, [issuesData])

  return {
    ...data,
    isLoading,
  }
}
