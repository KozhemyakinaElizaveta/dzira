import { Flex, Text, useDisclosure } from '@chakra-ui/react'
import { selectCurrentProject } from 'entities/project/model/selectors'
import { setCurrentTask, updateTaskInProject } from 'entities/project/model/slice'
import { Task } from 'entities/project/model/types'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { TaskCard } from 'shared/ui'
import { CreateTaskModal } from 'widgets/index'

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
    drop: (item: { id: string }) => onTaskDrop(item.id, title),
  }))
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentProject = useSelector(selectCurrentProject)
  return (
    <>
    <CreateTaskModal type="edit" isOpen={isOpen} onClose={onClose} project={currentProject}/>
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
          tasks.map((task) => (
            <TaskCard key={task.id} {...task}
            onCompleteChange={(id, completed) => {
              dispatch(
                updateTaskInProject({
                  projectId: currentProject.id,
                  taskId: id,
                  updates: { finished: completed },
                })
              );
            }}
            openModal={() => {
              dispatch(setCurrentTask(task));
              onOpen()
            }}/>
          ))}
      </Flex>
    </Flex>
    </>
  )
}
