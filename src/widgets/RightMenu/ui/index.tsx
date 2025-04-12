import { useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useMatch } from 'react-router-dom'
import { Plus } from 'shared/iconpack'
import { Box, Button, Flex } from 'shared/ui'
import { CreateTaskModal } from 'widgets/index'

export const RightMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isHome = useMatch('/board/:id')
  const isTeams = useMatch('/teams')
  const isProfile = useMatch('/profile')
  const isIssues = useMatch('/issues')
  const isBoards = useMatch('/boards')

  return (
    <>
      {isOpen && (
        <CreateTaskModal type="create" isOpen={isOpen} onClose={onClose} />
      )}
      <Flex
        bgColor={'white'}
        p={'16px 16px 2px 16px'}
        borderRadius={'20px 20px 0 0'}
        boxShadow={'0px 13px white'}
      >
        {(isHome || isIssues || isBoards) && (
          <Button
            h={'35px'}
            fontWeight={600}
            fontSize="14px"
            color={'white'}
            borderRadius="12px"
            background={'blue.500'}
            leftIcon={<Plus strokeColor={'white'} />}
            _hover={{
              bgColor: 'blue.300',
            }}
            onClick={onOpen}
          >
            Задача
          </Button>
        )}
        {isTeams && (
          <Flex align={'center'} gap={'20px'}>
            <Button
              onClick={() => {}}
              fontSize={'14px'}
              borderRadius={'15px'}
              w={'200px'}
              bgColor={'blue.500'}
            >
              <Box mr="4px">
                {React.cloneElement(<Plus />, {
                  strokeColor: 'white',
                })}
              </Box>
              Пригласить участника
            </Button>
          </Flex>
        )}
        {isProfile && (
          <Button borderRadius={'15px'} onClick={() => {}} fontSize={'14px'}>
            Изменить
          </Button>
        )}
      </Flex>
    </>
  )
}
