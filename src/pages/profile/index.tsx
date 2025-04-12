import { Flex } from 'shared/ui'
import { ContactInfo, UserCard, PasswordChange } from 'widgets'

const ProfilePage = () => {
  const data = {
    user: 'user',
    username: 'user',
    position: 'frontend-developer',
    name: 'Иван',
    surname: 'Иванов',
    patronymic: '',
  }
  return (
    <Flex h="100%" pt="40px" px="50px" gap="55px">
      <UserCard userData={data} />
      <ContactInfo email={''} phone={''} />
      <PasswordChange />
    </Flex>
  )
}

export default ProfilePage
