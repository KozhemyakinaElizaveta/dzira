import { Flex, Text, useDisclosure } from '@chakra-ui/react'
import { selectCurrentBoard } from 'entities/project/model/selectors'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { TaskCard } from 'shared/ui'
import { CreateTaskModal } from 'widgets/index'
import { Task } from '../lib'
import { setCurrentTask } from 'entities/project/model/slice'

interface BoardColumnProps {
  title: string
  titleRus: string
  tasks: Array<Task>
  hasBorder?: boolean
  onTaskDrop: (taskId: string, newStatus: string) => void
}

export const BoardColumn = ({
  title,
  titleRus,
  tasks,
  hasBorder,
  onTaskDrop,
}: BoardColumnProps) => {
  const [, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item: { id: string }) => {
      onTaskDrop(item.id, title)
    },
  }))

  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentProject = useSelector(selectCurrentBoard)
  const dispatch = useDispatch()

  return (
    <>
      {isOpen && (
        <CreateTaskModal
          type="edit"
          isOpen={isOpen}
          onClose={onClose}
          project={currentProject}
        />
      )}

      <Flex
        ref={drop}
        flexDirection="column"
        w="100%"
        h="100%"
        alignItems="center"
      >
        <Text fontSize="16px" fontWeight={700} mb="20px">
          {titleRus}
        </Text>

        <Flex
          flexDir="column"
          gap="15px"
          borderRight={hasBorder ? '2px dashed #ECEEF3' : 'none'}
          h="100%"
          px="8px"
          overflowY="scroll"
          w="100%"
        >
          {tasks &&
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                project={currentProject?.name || ''}
                {...task}
                openModal={() => {
                  dispatch(setCurrentTask(task))
                  onOpen()
                }}
              />
            ))}
        </Flex>
      </Flex>
    </>
  )
}
