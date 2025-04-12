import { useToast } from '@chakra-ui/react'
import { getUsers } from 'entities/project/api'
import { selectCurrentBoard } from 'entities/project/model/selectors'
import { User } from 'entities/project/model/types'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export interface Task {
  id: number
  title: string
  description: string
  deadline?: string
  priority: 'Low' | 'Medium' | 'High'
  status: 'Backlog' | 'InProgress' | 'Done'
  assignee: {
    fullName: string
  }
  user: string
}

export interface Team {
  id: number
  name: string
  users: User[]
}

export const useBoardTasks = () => {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [users, setUsers] = useState<User[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const currentProject = useSelector(selectCurrentBoard)

  useEffect(() => {
    if (!currentProject) return

    setIsLoading(true)
    getUsers()
      .then((response) => {
        const fetchedUsers = response.data.data
        setUsers(fetchedUsers)

        const groupedTeams: Team[] = []
        fetchedUsers.forEach((user: User) => {
          const existingTeam = groupedTeams.find(
            (team) => team.id === user.teamId
          )
          if (existingTeam) {
            existingTeam.users.push(user)
          } else {
            groupedTeams.push({
              id: user.teamId,
              name: user.teamName,
              users: [user],
            })
          }
        })

        setTeams(groupedTeams)
      })
      .catch(() => {
        toast({
          position: 'bottom-right',
          title: 'Ошибка',
          description: 'Не удалось получить данные',
          status: 'error',
          duration: 9000,
          isClosable: true,
          variant: 'top-accent',
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [currentProject, toast])

  return {
    users,
    teams,
    isLoading,
  }
}
