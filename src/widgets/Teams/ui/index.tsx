import { Button } from '@chakra-ui/react';
import { Avatar, Flex, Text } from 'shared/ui';
import { useSelector } from 'react-redux';
import { selectCurrentProject } from 'entities/project/model/selectors';
import { Task } from 'entities/project/model/types';

interface TeamMember {
  first_name: string;
  last_name: string;
  username: string;
  status: string;
  is_admin: boolean;
}

export const UserTeams = () => {
  const currentProject = useSelector(selectCurrentProject);

  const projectName = currentProject?.title || 'Проект не выбран';
  const teamMembers = extractTeamMembers(currentProject?.tasks);

  function extractTeamMembers(tasks: Task[] | undefined): TeamMember[] {
    if (!tasks) return [];

    const membersSet = new Set<string>();

    tasks.forEach((task) => {
      const assignee = `${task.first_name} ${task.last_name}`;
      if (assignee && !membersSet.has(assignee)) {
        membersSet.add(assignee);
      }
    });

    return Array.from(membersSet).map((name) => {
      const [first_name, last_name] = name.split(' ');
      return {
        first_name,
        last_name,
        username: `${first_name.toLowerCase()}.${last_name.toLowerCase()}`,
        status: 'Active', 
        is_admin: false, 
      };
    });
  }

  return (
    <Flex direction="column" gap="18px">
      <Text fontWeight={700} fontSize="20px">
        Команда проекта: {projectName}
      </Text>

      {teamMembers.length > 0 ? (
        teamMembers.map((person, index) => (
          <Flex key={index} alignItems="center" justifyContent="space-between">
            <Flex>
              <Avatar bg="mallow.300" name={`${person.first_name} ${person.last_name}`} />
              <Flex direction="column" px="12px" justifyContent="center">
                <Text fontWeight={600}>{`${person.first_name} ${person.last_name}`}</Text>
                <Text>@{person.username}</Text>
              </Flex>
            </Flex>
            <Flex alignItems="center" gap="14px">
              <Text color="gray.500" fontWeight={600} fontSize="16px">
                {person.status}
              </Text>
              {!!person.is_admin && (
                <Button
                  fontWeight={600}
                  padding="0"
                  colorScheme="transparent"
                  color="red.400"
                  _hover={{ color: 'red.500' }}
                >
                  Удалить
                </Button>
              )}
            </Flex>
          </Flex>
        ))
      ) : (
        <Text color="gray.500" textAlign="center">
          В проекте пока нет участников
        </Text>
      )}
    </Flex>
  );
};