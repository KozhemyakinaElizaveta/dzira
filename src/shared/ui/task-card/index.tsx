import { Calendar, Check } from 'shared/iconpack'; 
import { Avatar, Box, Flex, Tag, Text, Timer } from '..';
import { useDrag } from 'react-dnd';
import { IconButton } from '@chakra-ui/react';

interface TaskCardProps {
  project: string;
  branch?: string;
  number: number;
  description: string;
  tag: string;
  date: string;
  last_name: string;
  first_name: string;
  id: string;
  name: string;
  openModal: () => void;
  finished: boolean
  onCompleteChange?: (id: string, completed: boolean) => void; 
}

export const TaskCard = ({
  project,
  number,
  branch,
  description,
  tag,
  date,
  last_name,
  first_name,
  id,
  name,
  openModal,
  finished,
  onCompleteChange, 
}: TaskCardProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleCompleteChange = () => {
    if (onCompleteChange) {
      onCompleteChange(id, !finished);
    }
  };

  return (
    <Flex
      ref={drag}
      opacity={isDragging ? 0.5 : 1}
      flexDirection={'column'}
      bgColor={'gray.100'}
      w={'100%'}
      h={'fit-content'}
      borderRadius={'20px'}
      p={'20px'}
      gap={'10px'}
      onClick={openModal}
      cursor={'pointer'}
      position="relative"
    >
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Flex align={'center'} gap={'5px'} justify={'flex-start'}>
        <Text color={'mallow.400'} fontWeight={400}>
          {`${project} - ${number}`}
        </Text>
        <Box
        cursor="pointer"
        onClick={(e) => {
          e.stopPropagation(); 
          handleCompleteChange();
        }}
      >
        <IconButton
          aria-label="Mark as complete"
          icon={<Check />}
          color={finished ? 'green' : 'blue.400'} 
          variant={'solid'} 
          fontSize="16px"
        />
      </Box>
        </Flex>
        {branch && (
          <Text fontWeight={400} fontSize={'12px'} color={'mallow.400'}>
            {branch}
          </Text>
        )}
      </Flex>
      <Text fontWeight={500} lineHeight={'20px'} fontSize={'17px'}>
        {name}
      </Text>
      <Box>
        <Text fontWeight={600} lineHeight={'17.75px'}>
          {`${description.slice(0, 110)}...`}
        </Text>
      </Box>
      <Box h={'25px'}>{tag && <Tag tag={tag} />}</Box>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Flex gap={'5px'} alignItems={'center'}>
          <Calendar />
          {date ? (
            <Text fontSize={'12px'} fontWeight={400}>
              {date}
            </Text>
          ) : (
            <Text
              fontSize={'12px'}
              cursor={'pointer'}
              color={'blue.300'}
              _hover={{ color: 'blue.600' }}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              Указать
            </Text>
          )}
        </Flex>
        <Timer taskId={id} />
        {last_name && (
          <Avatar
            w={'28px'}
            h={'28px'}
            name={`${last_name} ${first_name}`}
            size={'xs'}
            bg={'mallow.300'}
            color={'white'}
          />
        )}
      </Flex>
    </Flex>
  );
};