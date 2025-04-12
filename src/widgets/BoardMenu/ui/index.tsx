import { useMatch, useNavigate } from 'react-router-dom'
import { Edit, Profile, Tasks } from 'shared/iconpack'
import { Box, ButtonsNavigations, Flex } from 'shared/ui'

function BoardMenu() {
  const navigate = useNavigate()
  const isLogin = useMatch('/login')
  const isIssues = useMatch('/issues')
  const isTeams = useMatch('/teams')
  const isProfile = useMatch('/profile')
  if (isLogin) return null
  return (
    <Flex
      flexDirection={'column'}
      justifyContent={'space-between'}
      align={'center'}
      h={'100%'}
      w={'100%'}
      pb={'30px'}
    >
      <Flex h={'100%'} flexDirection={'column'} align={'center'} gap="10px">
        <Box pt={isIssues ? '47px' : 0} pb={isIssues ? '50px' : 0}>
          <ButtonsNavigations
            title="Задачи"
            Icon={<Tasks />}
            check={!!isIssues}
            onClick={() => navigate('/issues')}
          />
        </Box>
        <Box pt={isTeams ? '90px' : 0}>
          <ButtonsNavigations
            title="Команды"
            Icon={<Edit />}
            check={!!isTeams}
            onClick={() => navigate('/teams')}
          />
        </Box>
      </Flex>
      <Flex flexDirection={'column'} gap={'10px'} align={'center'}>
        <Box pb={isProfile ? '50px' : 0}>
          <ButtonsNavigations
            title="Профиль"
            Icon={<Profile />}
            check={!!isProfile}
            onClick={() => navigate('/profile')}
          />
        </Box>
      </Flex>
    </Flex>
  )
}

export { BoardMenu }
