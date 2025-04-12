import { useEffect, useState } from 'react'
import { IconButton } from '@chakra-ui/react'
import { EditText } from 'shared/iconpack'
import { Flex, Text, Input } from 'shared/ui'

interface ContactInfoData {
  email: string | null
  phone: string | null
  telegramm?: string | null
}

export const ContactInfo = ({ email, phone, telegramm }: ContactInfoData) => {
  const [data, setData] = useState<ContactInfoData>({
    email: email || '',
    phone: phone || '',
    telegramm: telegramm || '',
  })

  useEffect(() => {
    setData({
      email: email || '',
      phone: phone || '',
      telegramm: telegramm || '',
    })
  }, [email, phone, telegramm])

  const [isEditingEmail, setIsEditingEmail] = useState(false)
  const [isEditingPhone, setIsEditingPhone] = useState(!data.phone)
  const [isEditingTelegram, setIsEditingTelegram] = useState(false)

  const handleUpdate = (field: keyof ContactInfoData, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
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
        Контактная информация
      </Text>
      <Flex direction="column" justify="space-between" mb="16px">
        <Text fontWeight={600} fontSize="16px">
          Почта
        </Text>
        {isEditingEmail ? (
          <Input
            height="32px"
            value={data.email || ''}
            onChange={(e) => handleUpdate('email', e.target.value)}
            onBlur={() => setIsEditingEmail(false)}
          />
        ) : (
          <Flex align="center">
            <Text fontWeight={500} fontSize="14px">
              {data.email}
            </Text>
            <IconButton
              onClick={() => setIsEditingEmail(true)}
              colorScheme="gray"
              icon={<EditText />}
              aria-label={'Редактировать'}
              size="sm"
              ml="8px"
            />
          </Flex>
        )}
      </Flex>

      <Flex direction="column" mb="16px">
        <Text fontWeight={600} fontSize="16px" mb="4px">
          Телефон
        </Text>
        {isEditingPhone ? (
          <Input
            height="32px"
            placeholder="Например, 88005553535"
            value={data.phone || ''}
            onChange={(e) => handleUpdate('phone', e.target.value)}
            onBlur={() => setIsEditingPhone(false)}
          />
        ) : (
          <Flex align="center">
            <Text fontWeight={500} fontSize="14px">
              {data.phone || 'Телефон не указан'}
            </Text>
            <IconButton
              onClick={() => setIsEditingPhone(true)}
              colorScheme="gray"
              icon={<EditText />}
              aria-label={'Редактировать'}
              size="sm"
              ml="8px"
            />
          </Flex>
        )}
      </Flex>

      <Flex direction="column">
        <Text fontWeight={600} fontSize="16px" mb="4px">
          Телеграм
        </Text>
        {isEditingTelegram ? (
          <Input
            height="32px"
            placeholder="Например, @i_van"
            value={data.telegramm || ''}
            onChange={(e) => handleUpdate('telegramm', e.target.value)}
            onBlur={() => setIsEditingTelegram(false)}
          />
        ) : (
          <Flex align="center">
            <Text fontWeight={500} fontSize="14px">
              {data.telegramm || 'Телеграм не указан'}
            </Text>
            <IconButton
              onClick={() => setIsEditingTelegram(true)}
              colorScheme="gray"
              icon={<EditText />}
              aria-label={'Редактировать'}
              size="sm"
              ml="8px"
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}
