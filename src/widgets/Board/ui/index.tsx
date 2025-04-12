import { Flex } from 'shared/ui'
import { BoardColumn } from './BoardColumn'
import { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { Task, useBoardTasks } from '../lib'
import LoadingPage from 'pages/loading'
import { useParams } from 'react-router-dom'
import { setCurrentBoard } from 'entities/project/model/slice'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllBoards } from 'entities/project/model/selectors'

export type GroupedTasks = {
  [status: string]: Task[]
}

export const Board = () => {
  const toast = useToast()
  const dispatch = useDispatch()
  const { id } = useParams()
  const projects = useSelector(selectAllBoards)

  useEffect(() => {
    if (id && projects.length > 0) {
      const project = projects.find((p) => String(p.id) === id)
      if (project) {
        dispatch(setCurrentBoard(project))
      } else {
        toast({
          title: 'Ошибка',
          description: 'Проект не найден',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, projects])

  const { tasks, isLoading, updateTaskStatus } = useBoardTasks()

  const [groupedTasks, setGroupedTasks] = useState<GroupedTasks>({
    Backlog: [],
    InProgress: [],
    Done: [],
  })

  useEffect(() => {
    if (tasks) {
      const grouped = tasks.reduce(
        (acc, task) => {
          acc[task.status].push(task)
          return acc
        },
        { Backlog: [], InProgress: [], Done: [] } as GroupedTasks
      )
      setGroupedTasks(grouped)
    }
  }, [tasks])

  const handleTaskDrop = (taskId: string, newStatus: string) => {
    const validStatuses = ['Backlog', 'InProgress', 'Done']

    if (!validStatuses.includes(newStatus)) {
      toast({
        title: 'Ошибка',
        description: 'Неверный статус',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    updateTaskStatus(
      parseInt(taskId, 10),
      newStatus as 'Backlog' | 'InProgress' | 'Done'
    )

    setGroupedTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks }

      Object.keys(updatedTasks).forEach((status) => {
        updatedTasks[status] = updatedTasks[status].filter(
          (task) => task.id !== parseInt(taskId, 10)
        )
      })

      updatedTasks[newStatus].push(
        tasks.find((task) => task.id === parseInt(taskId, 10))!
      )

      return updatedTasks
    })
  }

  return (
    <>
      <Flex w={'100%'} h={'100%'} py={'10px'} position="relative">
        {!isLoading ? (
          <>
            {['Backlog', 'InProgress', 'Done'].map((status) => (
              <BoardColumn
                key={status}
                title={status}
                titleRus={
                  status === 'Backlog'
                    ? 'Бэклог'
                    : status === 'InProgress'
                      ? 'В процессе'
                      : 'Готово'
                }
                tasks={groupedTasks[status]}
                hasBorder
                onTaskDrop={(taskId) => handleTaskDrop(taskId, status)}
              />
            ))}
          </>
        ) : (
          <LoadingPage />
        )}
      </Flex>
    </>
  )
}
