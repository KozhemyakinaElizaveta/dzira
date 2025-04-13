import { Flex, Text } from '@chakra-ui/react'
import { useBoards } from '../lib'
import { useNavigate } from 'react-router-dom'
import LoadingPage from 'pages/loading'

export const Boards = () => {
  const { projects, isLoading } = useBoards()
  const navigate = useNavigate()

  return (
    <Flex flexDirection="column" w="100%" h="100%" gap="20px">
      <Text fontSize="20px" fontWeight={700}>
        Проекты
      </Text>

      {isLoading ? (
        <LoadingPage />
      ) : (
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
                px={'20px'}
                borderRadius="8px"
                alignItems="center"
                justifyContent={'space-between'}
              >
                <Text fontSize="16px" fontWeight={500}>
                  {project.name}
                </Text>
                <Text
                  cursor={'pointer'}
                  onClick={() => {
                    if (project) {
                      navigate(`/board/${project.id}`)
                    }
                  }}
                  _hover={{ color: 'blue.500' }}
                >
                  Перейти на доску
                </Text>
              </Flex>
            ))
          ) : (
            <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'}>
              <Text color="gray.500" textAlign="center" fontSize="24px">
                Нет доступных проектов
              </Text>
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  )
}
