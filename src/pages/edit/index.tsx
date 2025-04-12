import { Flex } from 'shared/ui'
import { UserTeams } from 'widgets'

const TeamsPage = () => {
  return (
    <Flex h="100%" direction="column" pt="40px" px="50px" gap="30px">
      <UserTeams />
    </Flex>
  )
}

export default TeamsPage
