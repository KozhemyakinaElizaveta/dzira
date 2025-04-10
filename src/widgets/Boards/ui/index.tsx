import { Flex, Text } from '@chakra-ui/react';
import { selectAllProjects } from 'entities/project/model/selectors';
import { useSelector } from 'react-redux';

export const Boards = () => {
  const projects = useSelector(selectAllProjects);

  return (
    <Flex flexDirection="column" w="100%" h="100%" gap="20px">
      <Text fontSize="20px" fontWeight={700}>
        Проекты
      </Text>
      <Flex
        flexDirection="column"
        w="100%"
        h="100%"
        overflowY="scroll"
        gap="5px"
      >
        {projects.length > 0 ? (
          projects.map((project) => (
            <Flex
              key={project.id} 
              w="100%"
              backgroundColor="gray.100"
              p="10px" 
              borderRadius="8px"
              alignItems="center" 
            >
              <Text fontSize="16px" fontWeight={500}>
                {project.title} 
              </Text>
            </Flex>
          ))
        ) : (
          <Text color="gray.500" textAlign="center" fontSize={'24px'}>
            Нет доступных проектов
          </Text>
        )}
      </Flex>
    </Flex>
  );
};