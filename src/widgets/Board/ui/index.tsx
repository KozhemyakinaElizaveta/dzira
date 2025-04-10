import { Flex, Input } from 'shared/ui'
import { BoardColumn } from './BoardColumn'
import { useEffect, useState } from 'react'
import {
  IconButton,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuList,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import TaskModal from 'widgets/TaskModal/ui'
import { Settings } from 'shared/iconpack/Settings'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentProject } from 'entities/project/model/selectors'
import { updateTaskSectionId } from 'entities/project/model/slice'

type BoardTask = {
  id: string
  name: string
  project: string
  number: number
  branch?: string
  description: string
  tag: string
  finished: boolean
  date: string
  last_name: string
  first_name: string
  section_id: number
  priority?: string
}

export type GroupedTasks = {
  [sectionId: number]: BoardTask[]
}

export const Board = () => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentProject = useSelector(selectCurrentProject)
  const [newSection, setNewSection] = useState('')
  const [sections, setSections] = useState<{ id: number; name: string }[]>([])
  const [tasks, setTasks] = useState<GroupedTasks>({})
  const toast = useToast()

  useEffect(() => {
    if (currentProject) {
      setSections(
        currentProject.section_ids?.map((section) => ({
          id: section.section_id,
          name: section.name,
        })) || []
      );
  
      setTasks(
        currentProject.tasks?.reduce((acc, task) => {
          if (!acc[task.section_id]) acc[task.section_id] = [];
  
          acc[task.section_id].push({
            id: String(task.id),
            name: task.name,
            project: currentProject.title,
            number: typeof task.id === 'string' ? parseInt(task.id, 10) : task.id,
            branch: '/main',
            description: task.description || '',
            tag: task.tags[0] || '',
            finished: task.finished,
            date: new Date(task.deadline).toLocaleDateString('ru-RU'),
            last_name: task.last_name,
            first_name: task.first_name,
            section_id: task.section_id,
            priority: task.priority
          });
  
          return acc;
        }, {} as GroupedTasks) || {}
      );
    }
  }, [currentProject]);

  const handleTaskDrop = (taskId: string, newStatus: string) => {
    const numericNewStatus = parseInt(newStatus, 10);

    const allTasks = Object.values(tasks).flat();
    const taskToMove = allTasks.find((task) => task.id === taskId);
  
    if (!taskToMove) {
      console.error(`Task with id ${taskId} not found`);
      return;
    }

    if (!sections.some((section) => section.id === numericNewStatus)) {
      toast({
        title: 'Ошибка',
        description: 'Неверная секция',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };

      Object.keys(updatedTasks).forEach((sectionId) => {
        const numSectionId = parseInt(sectionId, 10);
        updatedTasks[numSectionId] = updatedTasks[numSectionId].filter(
          (task) => task.id !== taskId
        );
      });

      const updatedTask = {
        ...taskToMove,
        section_id: numericNewStatus,
      };
  
      updatedTasks[numericNewStatus] = [
        ...(updatedTasks[numericNewStatus] || []),
        updatedTask,
      ];
  
      return updatedTasks;
    });

    dispatch(
      updateTaskSectionId({
        taskId: taskId,
        newSectionId: numericNewStatus,
      })
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSection(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newSection.trim() !== '') {
      const sectionName = newSection.trim()

      if (!sections.some(s => s.name === sectionName)) {
        const newSectionId = sections.length > 0 
          ? Math.max(...sections.map(s => s.id)) + 1 
          : 1

        setSections([...sections, { id: newSectionId, name: sectionName }])
        setTasks(prev => ({ ...prev, [newSectionId]: [] }))
        setNewSection('')
        
        toast({
          title: 'Успешно',
          description: `Секция "${sectionName}" добавлена`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Дублирование секции',
          description: 'Такая секция уже существует',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        })
      }
    }
  }

  return (
    <>
      <TaskModal 
        isOpen={isOpen} 
        onClose={onClose}
      />
      <Flex w={'100%'} h={'100%'} py={'25px'} position="relative">
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<Settings />}
            aria-label="Settings"
            colorScheme="transparent"
            position="absolute"
            top="4"
            right="2"
          />
          <MenuList p={4}>
            <Input
              placeholder="Добавить секцию"
              value={newSection}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              mb={2}
            />
            <List spacing={2}>
              {sections.map((section) => (
                <ListItem key={section.id}>{section.name}</ListItem>
              ))}
            </List>
          </MenuList>
        </Menu>

        {sections.map((section) => (
  <BoardColumn
    key={section.id}
    title={String(section.id)}
    titleRus={section.name}
    tasks={tasks[section.id] || []}
    hasBorder
    onTaskDrop={handleTaskDrop}
    openModal={onOpen}
  />
))}
      </Flex>
    </>
  )
}