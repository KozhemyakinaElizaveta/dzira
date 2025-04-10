import { useState } from 'react'
import { Flex, Input, Text, Button } from 'shared/ui'

export const PasswordChange = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setError('Пароли не совпадают!')
    } else {
      setError('')
      console.log('Password successfully changed!')
    }
  }

  return (
    <Flex
      w="min-content"
      minW="350px"
      h="min-content"
      bg="blue.100"
      borderRadius="20px"
      p="30px"
      justifyContent="space-between"
      position="relative"
      direction="column"
    >
      <Text fontWeight={700} fontSize="16px" mb="12px">
        Смена пароля
      </Text>

      <Flex direction="column" mb="16px">
        <Text fontWeight={600} fontSize="16px" mb="4px">
          Старый пароль
        </Text>
        <Input
          height="32px"
          type="password"
          value={oldPassword}
          placeholder="Введите старый пароль"
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </Flex>

      <Flex direction="column" mb="16px">
        <Text fontWeight={600} fontSize="16px" mb="4px">
          Новый пароль
        </Text>
        <Input
          height="32px"
          type="password"
          value={newPassword}
          placeholder="Введите новый пароль"
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Flex>

      <Flex direction="column" mb="16px">
        <Text fontWeight={600} fontSize="16px" mb="4px">
          Повторите новый пароль
        </Text>
        <Input
          height="32px"
          type="password"
          value={confirmPassword}
          placeholder="Повторите новый пароль"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Flex>

      {error && (
        <Text color="red.500" fontSize="14px" mb="8px">
          {error}
        </Text>
      )}

      <Button
        onClick={handlePasswordChange}
        colorScheme="blue"
        width="50%"
        mt="12px"
      >
        Сменить пароль
      </Button>
    </Flex>
  )
}
