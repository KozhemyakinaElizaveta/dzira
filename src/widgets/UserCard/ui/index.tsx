import { useEffect, useState } from 'react'
import { IconButton } from '@chakra-ui/react'
import { EditText } from 'shared/iconpack'
import { Avatar, Text, Box, Button, Flex, Input } from 'shared/ui'

interface UserDataType {
  userData: {
  user: string
  username: string
  position: string
  name?: string
  surname?: string
  patronymic: string
  }
}

export const UserCard = ({userData}: UserDataType) => {
  const [data, setData] = useState({
    ...userData,
    name: userData.name || '',
    surname: userData.surname || '',
    patronymic: userData.patronymic || ''
  });

  useEffect(() => {
    setData({
      ...userData,
      name: userData.name || '',
      surname: userData.surname || ''
    });
  }, [userData]);

  const [isEditing, setIsEditing] = useState(false)

  const handleUpdate = (field: keyof typeof data, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
  }

  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <Flex
      w="min-content"
      minW="300px"
      h="min-content"
      bg="blue.100"
      borderRadius="20px"
      p="16px"
      alignItems="center"
      justifyContent="space-between"
      position="relative"
    >
      <Flex
        alignItems="center"
        w="100%"
        direction={isEditing ? 'column' : 'row'}
      >
        <Avatar
          name={`${data.name} ${data.surname}`}
          bg="mallow.300"
          size="lg"
        />
        <Flex direction="column" m="12px" w="100%">
          {!isEditing ? (
            <>
              <Text fontWeight={700} fontSize="16px">
              {`${data.name} ${data.surname}`}
              </Text>
              <Text fontWeight={600} fontSize="14px">
                @{data.username}
              </Text>
              <Text fontSize="14px" color="gray.500">
                {data.position}
              </Text>
            </>
          ) : (
            <Flex direction="column" gap="22px">
              <Box>
                <Text fontWeight={600} fontSize="16px">
                  Имя
                </Text>
                <Input
                  value={data.name}
                  onChange={(e) => handleUpdate('name', e.target.value)}
                  placeholder="Имя"
                />
              </Box>
              <Box>
                <Text fontWeight={600} fontSize="16px">
                  Фамилия
                </Text>
                <Input
                  value={data.surname}
                  onChange={(e) => handleUpdate('surname', e.target.value)}
                  placeholder="Фамилия"
                />
              </Box>
              <Box>
                <Text fontWeight={600} fontSize="16px">
                  Username
                </Text>
                <Input
                  value={data.username}
                  onChange={(e) => handleUpdate('username', e.target.value)}
                  placeholder="Username"
                />
              </Box>
              <Box>
                <Text fontWeight={600} fontSize="16px">
                  Должность
                </Text>
                <Input
                  value={data.position}
                  onChange={(e) => handleUpdate('position', e.target.value)}
                  placeholder="Должность"
                />
              </Box>
              <Button onClick={handleSave} mt="8px" w="50%">
                Сохранить
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
      <IconButton
        position="absolute"
        top="12px"
        right="12px"
        colorScheme="gray"
        icon={<EditText />}
        aria-label={'Редактировать'}
        size="sm"
        onClick={() => setIsEditing(!isEditing)}
      />
    </Flex>
  )
}
