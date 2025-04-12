import { Calendar } from 'shared/iconpack'; 
import { Avatar, Box, Flex, Tag, Text, Timer } from '..';
import { useDrag } from 'react-dnd';

interface TaskCardProps {
  project: string;
  openModal: () => void;
  id: number;
  title: string;
  description: string;
  deadline?: string;
  priority: "Low" | "Medium" | "High";
  assignee: {
    fullName: string;
  };
}

export const TaskCard = ({
  project,
  description,
  id,
  priority,
  deadline,
  title,
  assignee,
  openModal,
}: TaskCardProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  

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
          {project}
        </Text>
        </Flex>
          <Text fontWeight={400} fontSize={'12px'} color={'mallow.400'}>
            {'/main'}
          </Text>
      </Flex>
      <Text fontWeight={500} lineHeight={'20px'} fontSize={'17px'}>
        {title}
      </Text>
      <Box>
        <Text fontWeight={600} lineHeight={'17.75px'}>
          {description.length > 130 ? `${description.slice(0, 130)}...` : description}
        </Text>
      </Box>
      <Box h={'25px'}><Tag tag={priority} /></Box>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Flex gap={'5px'} alignItems={'center'}>
          <Calendar />
          {deadline ? (
            <Text fontSize={'12px'} fontWeight={400}>
              {deadline}
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
        <Timer taskId={id.toString()} />
          <Avatar
            w={'28px'}
            h={'28px'}
            name={assignee.fullName}
            size={'xs'}
            bg={'mallow.300'}
            color={'white'}
          />
      </Flex>
    </Flex>
  );
};