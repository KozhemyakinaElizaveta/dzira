import { Flex } from 'shared/ui'
import { ProjectEdit, UserTeams } from 'widgets'

const EditPage = () => {
  return (
    <Flex h="100%" direction="column" pt="40px" px="50px" gap="30px">
      <ProjectEdit />
      <UserTeams />
    </Flex>
  )
}

export default EditPage
