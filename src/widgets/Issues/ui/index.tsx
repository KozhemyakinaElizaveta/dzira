import { Flex, Text } from '@chakra-ui/react';
import { selectAllProjects } from 'entities/project/model/selectors';
import { useSelector } from 'react-redux';

export const Issues = () => {
  const projects = useSelector(selectAllProjects);

  const allTasks = projects.flatMap((project) => project.tasks || []);

  return (
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
  );
};