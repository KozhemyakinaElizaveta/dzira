import { Flex, Text } from '@chakra-ui/react'
import { selectCurrentProject } from 'entities/project/model/selectors'
import { updateTaskInProject } from 'entities/project/model/slice'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { TaskCard } from 'shared/ui'

interface BoardColumnProps {
  title: string
  titleRus: string
  tasks: Array<{
    id: string
    name: string
    project: string
    number: number
    branch?: string
    description: string
    finished: boolean
    tag: string
    date: string
    last_name: string
    first_name: string
  }>
  hasBorder?: boolean
  onTaskDrop: (taskId: string, newStatus: string) => void
  openModal: () => void
}

export const BoardColumn = ({
  title,
  titleRus,
  tasks,
  hasBorder,
  onTaskDrop,
  openModal,
}: BoardColumnProps) => {
  const [, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item: { id: string }) => onTaskDrop(item.id, title),
  }))
  const dispatch = useDispatch()
  const currentProject = useSelector(selectCurrentProject)
  return (
    <Flex
      ref={drop}
      flexDirection="column"
      w="100%"
      h={'100%'}
      alignItems={'center'}
    >
      <Text fontSize="16px" fontWeight={700} mb="20px">
        {titleRus}
      </Text>
      <Flex
        flexDir={'column'}
        gap={'15px'}
        borderRight={hasBorder ? '2px dashed #ECEEF3' : 'none'}
        h={'100%'}
        px={'8px'}
        overflowY={'scroll'}
        w="100%"
      >
        {tasks &&
          tasks.map((task, index) => (
            <TaskCard key={index} {...task} openModal={openModal} 
            onCompleteChange={(id, completed) => {
              dispatch(
                updateTaskInProject({
                  projectId: currentProject.id,
                  taskId: id,
                  updates: { finished: completed },
                })
              );
            }}/>
          ))}
      </Flex>
    </Flex>
  )
}
