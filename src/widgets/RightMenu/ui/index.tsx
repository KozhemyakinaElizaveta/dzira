import React from "react"
import { useMatch } from "react-router-dom"
import { Delete, Plus } from "shared/iconpack"
import { Box, Button, Flex } from "shared/ui"
import { CreateTaskModal } from "widgets/index"

export const RightMenu = () => {
    const isHome = useMatch('/board')
    const isEdit = useMatch('/edit')
    const isProfile = useMatch('/profile')
    const isIssues = useMatch('/issues')
    const isBoards = useMatch('/boards')

    return (
        <>
        <Flex bgColor={'white'} p={'16px 16px 2px 16px'} borderRadius={'20px 20px 0 0'} boxShadow={ '0px 13px white'}>
        {(isHome || isIssues || isBoards) &&
            <CreateTaskModal/>
        }
        {isEdit &&
            <Flex align={'center'} gap={'20px'}>
                <Button
                onClick={() => {}}
                fontSize={'14px'}
                borderRadius={'15px'}
                w={'200px'}
                bgColor={'blue.500'}
                >
                <Box mr="4px">
                    {React.cloneElement(<Plus/>, {
                    strokeColor: 'white',
                    })}
                </Box>
                Пригласить участника
                </Button>
                <Button
                onClick={() => {}}
                fontSize={'14px'}
                variant={'delete'}
                w={'160px'}
                >
                <Box mr="4px">
                    {React.cloneElement(<Delete/>)}
                </Box>
                Удалить проект
                </Button>
            </Flex>
        }
        {isProfile &&
            <Button
            borderRadius={'15px'}
            onClick={() => {}}
            fontSize={'14px'}
            >
              Изменить
            </Button>
        }
        </Flex>
        </>
    )
}