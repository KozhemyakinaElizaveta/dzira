import { Menu, MenuButton, MenuItem, MenuList, Button, useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateTaskModal } from 'widgets/index';
import { useIssues } from '../lib';
import { setCurrentTask } from 'entities/project/model/slice';
import LoadingPage from 'pages/loading';
import { Task } from 'entities/project/model/types';
import { selectCurrentBoard, selectAllBoards } from 'entities/project/model/selectors';
import { useState } from 'react';
import { Flex, Input, Text } from 'shared/ui';

export const Issues = () => {
  const { issues, isLoading } = useIssues();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const currentProject = useSelector(selectCurrentBoard);
  const allProjects = useSelector(selectAllBoards);

  const [statusFilter, setStatusFilter] = useState<string | null>(null); 
  const [boardFilter, setBoardFilter] = useState<number | null>(null); 
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAssignee, setSearchAssignee] = useState(''); 

  const handleEditTask = (task: Task) => {
    dispatch(setCurrentTask(task));
    onOpen();
  };

  const filteredIssues = issues.filter((task) => {
    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    const matchesBoard = boardFilter ? task.boardId === boardFilter : true;
    const matchesTitle = task.title.toLowerCase().includes(searchTitle.toLowerCase());
    const matchesAssignee = task.assignee?.fullName.toLowerCase().includes(searchAssignee.toLowerCase());

    return matchesStatus && matchesBoard && matchesTitle && matchesAssignee;
  });

  return (
    <>
      {isOpen && (
        <CreateTaskModal type="edit" isOpen={isOpen} onClose={onClose} project={currentProject} />
      )}

      <Flex flexDirection="column" w="100%" h="100%" gap="20px">
        <Text fontSize="20px" fontWeight={700}>
          Все задачи
        </Text>

        <Flex gap="10px" alignItems="center">
          <Menu>
            <MenuButton as={Button} variant="outline" color={'white'} _hover={{ background: 'blue.400', color: 'white' }}>
              {statusFilter || 'Фильтр по статусу'}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setStatusFilter(null)}>Очистить</MenuItem>
              <MenuItem onClick={() => setStatusFilter('Backlog')}>Backlog</MenuItem>
              <MenuItem onClick={() => setStatusFilter('InProgress')}>In Progress</MenuItem>
              <MenuItem onClick={() => setStatusFilter('Done')}>Done</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} variant="outline" color={'white'} _hover={{ background: 'blue.400', color: 'white' }}>
              {boardFilter ? allProjects.find((p) => p.id === boardFilter)?.name : 'Фильтр по доске'}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setBoardFilter(null)}>Очистить</MenuItem>
              {allProjects.map((project) => (
                <MenuItem key={project.id} onClick={() => setBoardFilter(project.id)}>
                  {project.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Input
            placeholder="Поиск по названию"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            w="250px"
          />

          <Input
            placeholder="Поиск по исполнителю"
            value={searchAssignee}
            onChange={(e) => setSearchAssignee(e.target.value)}
            w="250px"
          />
        </Flex>

        <Flex
          flexDirection="column"
          w="100%"
          h="100%"
          overflowY="scroll"
          gap="5px"
          p="10px"
          borderRadius="8px"
          bg="gray.50"
        >
          {isLoading ? (
            <LoadingPage />
          ) : filteredIssues.length > 0 ? (
            filteredIssues.map((task) => (
              <Flex
                key={task.id}
                w="100%"
                backgroundColor="gray.100"
                p="10px"
                borderRadius="8px"
                alignItems="center"
                cursor="pointer"
                _hover={{ bg: 'gray.200' }}
                onClick={() => handleEditTask(task)}
              >
                <Text fontSize="16px" fontWeight={500}>
                  {task.title}
                </Text>
              </Flex>
            ))
          ) : (
            <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'}>
            <Text color="gray.500" textAlign="center" fontSize="24px">
              Нет доступных задач
            </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
};