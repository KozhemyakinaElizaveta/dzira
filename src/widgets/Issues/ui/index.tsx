import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { selectAllProjects, selectCurrentProject } from 'entities/project/model/selectors';
import { setCurrentTask } from 'entities/project/model/slice';
import { useDispatch, useSelector } from 'react-redux';
import { CreateTaskModal } from 'widgets/index';

export const Issues = () => {
  const projects = useSelector(selectAllProjects);
  const currentProject = useSelector(selectCurrentProject)
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const allTasks = projects.flatMap((project) => project.tasks || []);

  return (
    <>
    <CreateTaskModal type="edit" isOpen={isOpen} onClose={onClose} project={currentProject}/>
    <Flex flexDirection="column" w="100%" h="100%" gap="20px">
      <Text fontSize="20px" fontWeight={700}>
        Все задачи
      </Text>
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
        {allTasks.length > 0 ? (
          allTasks.map((task) => (
            <Flex
              key={task.id} 
              w="100%"
              backgroundColor="gray.100"
              p="10px"
              borderRadius="8px"
              alignItems="center"
              cursor="pointer"
              _hover={{ bg: 'gray.200' }}
              onClick={() => {
                            dispatch(setCurrentTask(task));
                            onOpen()
                          }}
            >
              <Text fontSize="16px" fontWeight={500}>
                {task.name}
              </Text>
            </Flex>
          ))
        ) : (
          <Text color="gray.500" textAlign="center" fontSize="24px">
            Нет доступных задач
          </Text>
        )}
      </Flex>
    </Flex>
    </>
  );
};