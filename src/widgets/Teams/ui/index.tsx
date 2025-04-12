import { Avatar, Box, Button, Flex, Text } from 'shared/ui';
import { useBoardTasks } from '../lib';
import LoadingPage from 'pages/loading';
import React from 'react';
import { Delete } from 'shared/iconpack';

export const UserTeams = () => {
  const { teams, isLoading } = useBoardTasks();

  return (
    <Flex direction="column" gap="24px">
      {!isLoading ?
      <>
      {teams.length > 0 ? (
        teams.map((team) => (
          <Flex key={team.id} direction="column" gap="12px">
            <Text fontWeight={700} fontSize="20px">
              {team.name}
            </Text>

            {team.users.length > 0 ? (
              team.users.map((person, index) => (
                <Flex key={index} alignItems="center" justifyContent="space-between">
                  <Flex alignItems="center">
                    <Avatar bg="mallow.300" name={person.fullName} />
                    <Flex direction="column" px="12px" justifyContent="center">
                      <Text fontWeight={600}>{person.fullName}</Text>
                      <Text>@{person.email.split('@')[0]}</Text>
                    </Flex>
                  </Flex>
                  <Button
                onClick={() => {}}
                fontSize={'14px'}
                variant={'delete'}
                w={'100px'}
                >
                <Box mr="4px">
                    {React.cloneElement(<Delete/>)}
                </Box>
                Удалить
                </Button>
                </Flex>
              ))
            ) : (
              <Text color="gray.500" textAlign="center">
                В команде пока нет участников
              </Text>
            )}
          </Flex>
        ))
      ) : (
        <Text color="gray.500" textAlign="center">
          Команды не найдены
        </Text>
      )}
      </>
      : <LoadingPage/>}
    </Flex>
  );
};