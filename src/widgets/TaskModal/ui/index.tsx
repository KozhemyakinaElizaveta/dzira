import {
  chakra,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  UseDisclosureReturn,
  useTheme,
} from '@chakra-ui/react'
import { Clip, Close, Delete, Plus } from 'shared/iconpack'
import { Button, Text, Flex, Tag, Box, Timer } from 'shared/ui'
import React from 'react'

interface Props {
  isOpen: UseDisclosureReturn['isOpen']
  onClose: UseDisclosureReturn['onClose']
}

const data = {
  id: '9',
  project: 'Asist1',
  number: 9,
  branch: '/dev',
  title:
    'Отследить при каких обстоятельствах происходит баг: сбивается порядок упражнений при создании тренировки...',
  description:
    'Опрос привязывается к назначению, он может быть дефолтным или специфичным',
  tag: 'Тестировка',
  deadline: '30 сентября',
  date: '25 сентября',
  last_name: 'Буриков',
  first_name: 'Влад',
  duration: '',
  priority: 'Срочный',
  author: 'Вера Петросян',
  changes: {
    changes_date: '27 сентября',
    text: [
      {
        author: 'Вера Петросян',
        message: 'aaaaaaaaa',
        time: '13:34',
      },
      {
        author: 'Влад Буриков',
        message: 'установил(а) статус задачи В работе',
        time: '19:01',
      },
    ],
  },
}

const TaskModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const theme = useTheme()
  const blue400 = theme.colors.blue['400']
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      size="6xl"
      motionPreset="none"
      scrollBehavior="outside"
      blockScrollOnMount={false}
      trapFocus={false}
    >
      <ModalOverlay />
      <ModalContent h="fit-content" w="878px" borderRadius={'20px'}>
        <Flex
          w={'100%'}
          alignItems={'center'}
          justifyContent={'space-between'}
          p={'5px 10px 10px 20px'}
        >
          <Text fontWeight={600}>{`${data.project} - ${data.number}`}</Text>
          <IconButton
            icon={<Close />}
            onClick={() => onClose()}
            aria-label="close"
            background="transparent"
            _hover={{ background: 'gray.200' }}
          />
        </Flex>
        <Heading
          color={'black.100'}
          fontSize={'16px'}
          fontWeight={700}
          pl={'20px'}
        >
          {data.title}
        </Heading>
        <ModalBody>
          <Flex flexDir={'column'} justifyContent={'center'}>
            <Text fontSize={'14px'} fontWeight={400}>
              {data.description}
            </Text>
            <Flex justifyContent={'center'} mt={'30px'}>
              <Flex
                flexDir={'column'}
                gap={'16px'}
                justifyContent={'flex-start'}
                w={'100%'}
                borderRight={'2px dashed #ECEEF3'}
              >
                <Text fontWeight={600} fontSize={'14px'}>
                  Исполнитель:{' '}
                  <chakra.span
                    fontWeight={600}
                    fontSize={'14px'}
                    color={'blue.300'}
                  >
                    {data.first_name} {data.last_name}
                  </chakra.span>
                </Text>
                <Text fontWeight={600} fontSize={'14px'}>
                  Дедлайн:{' '}
                  <chakra.span
                    fontWeight={600}
                    fontSize={'14px'}
                    color={'blue.300'}
                  >
                    {data.deadline ? data.deadline : 'Не указан'}
                  </chakra.span>
                </Text>
                <Text fontWeight={600} fontSize={'14px'}>
                  Время выполнения:{' '}
                  <chakra.span
                    fontWeight={600}
                    fontSize={'14px'}
                    color={'blue.300'}
                  >
                    {data.duration ? data.duration : 'Не указан'}
                  </chakra.span>
                </Text>
                <Text fontWeight={600} fontSize={'14px'}>
                  Приоритет:{' '}
                  <chakra.span
                    fontWeight={600}
                    fontSize={'14px'}
                    color={'red.400'}
                  >
                    {data.priority}
                  </chakra.span>
                </Text>
                <Text fontWeight={600} fontSize={'14px'}>
                  Ветка:{' '}
                  <chakra.span
                    fontWeight={600}
                    fontSize={'14px'}
                    color={'blue.300'}
                  >
                    {data.branch}
                  </chakra.span>
                </Text>
                <Text fontWeight={600} fontSize={'14px'}>
                  Автор: {data.author}
                </Text>
                <Text fontWeight={600} fontSize={'14px'}>
                  Создана: {data.date}
                </Text>
                <Flex alignItems={'center'} gap={'10px'} mb={'15px'}>
                  <Text fontWeight={600} fontSize={'14px'}>
                    Тег:
                  </Text>
                  <Tag tag={data.tag} withIcon />
                  <Button
                    h={'32px'}
                    fontWeight={500}
                    fontSize="12px"
                    color={'blue.300'}
                    borderRadius="8px"
                    background={'white'}
                    border={'1px dashed #6D9AF2'}
                    leftIcon={<Plus strokeColor={'#6D9AF2'}/>}
                    _hover={{
                      borderColor: 'blue.600',
                      color: 'blue.600'
                    }}
                    onClick={() => {}}
                  >
                    Добавить тег
                  </Button>
                </Flex>
                <Timer taskId={data.id}/>
              </Flex>
              <Flex
                flexDir={'column'}
                gap={'16px'}
                w={'100%'}
                h={'100%'}
                px={'20px'}
              >
                <Text fontWeight={600} fontSize={'14px'} align={'center'}>
                  История изменений
                </Text>
                <Text
                  fontWeight={600}
                  fontSize={'14px'}
                  color={'gray.500'}
                  align={'center'}
                >
                  {data.changes.changes_date}
                </Text>
                {data.changes.text.map((change) => (
                  <Flex align={'center'} justifyContent={'space-between'}>
                    <Flex gap={'4px'}>
                      <Text fontWeight={600} fontSize={'14px'}>
                        {change.author}{' '}
                      </Text>
                      <chakra.span
                        fontWeight={500}
                        fontSize={'14px'}
                        color={'gray.500'}
                      >
                        {change.message}
                      </chakra.span>
                    </Flex>
                    <chakra.span
                      fontWeight={500}
                      fontSize={'14px'}
                      color={'gray.500'}
                    >
                      {change.time}
                    </chakra.span>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex
            justifyContent={'space-between'}
            w={'100%'}
            alignItems={'center'}
          >
            <Flex alignItems={'center'} gap={'5px'} cursor={'pointer'}>
              <Clip color={blue400} />
              <Text
                color={'blue.400'}
                fontWeight={600}
                fontSize={'14px'}
                onClick={() => {}}
              >
                посмотреть вложения
              </Text>
            </Flex>
            <Button
            onClick={() => {}}
            fontSize={'14px'}
            variant={'delete'}
            >
              <Box mr="4px">
                {React.cloneElement(<Delete/>)}
              </Box>
              Удалить
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default TaskModal
