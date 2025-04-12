import { Flex, Button, Input, Text } from 'shared/ui';
import { Calendar, Plus } from 'shared/iconpack';
import {
  chakra,
  FormControl,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseDisclosureReturn,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useCreateForm } from '../lib';
import { Board } from 'entities/project/model/types';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentBoard } from 'entities/project/model/slice';
import { selectCurrentBoard, selectCurrentTask } from 'entities/project/model/selectors';

export const CreateTaskModal = ({
  type,
  onClose,
  isOpen,
  project,
}: {
  type: 'create' | 'edit';
  isOpen: UseDisclosureReturn['isOpen'];
  onClose: UseDisclosureReturn['onClose'];
  project?: Board | null;
}) => {
  const [isDeadline, setDeadline] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isIssues = useMatch('/issues');

  const { formik, users, projects } = useCreateForm(type, onClose, project?.id);
  const currentTask = useSelector(selectCurrentTask);
  const currentProject = useSelector(selectCurrentBoard);

  useEffect(() => {
    if (type === 'edit' && currentTask && currentProject) {
      formik.setValues({
        title: currentTask.title,
        description: currentTask.description,
        boardId: currentProject.id,
        assigneeId: currentTask.assignee.id,
        priority: currentTask.priority,
        status: currentTask.status
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, currentTask]);

  const handleAssigneeChange = (assigneeId: number) => {
    formik.setFieldValue('assigneeId', assigneeId);
  };

  const handlePriorityChange = (priority: string) => {
    formik.setFieldValue('priority', priority);
  };

  const handleProjectChange = (projectId: number) => {
    formik.setFieldValue('boardId', projectId);
  };

  const {id} = useParams()
  
    useEffect(() => {
      if (id && projects.length > 0) {
        const project = projects.find((p) => String(p.id) === id); 
        if (project) {
          dispatch(setCurrentBoard(project)); 
        } 
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent w={'800px'}>
          <ModalHeader>{type === 'create' ? 'Создание задачи' : 'Редактирование задачи'}</ModalHeader>
          <chakra.form onSubmit={formik.handleSubmit} w={'100%'}>
            <ModalBody>
              <Flex flexDir={'column'} gap={'15px'}>
                <FormControl isRequired>
                  <Input
                    id="name"
                    name="title"
                    placeholder="Задача"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                  />
                </FormControl>

                <FormControl>
                  <Input
                    id="description"
                    name="description"
                    placeholder="Описание"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  />
                </FormControl>

                <FormControl>
                  <Menu>
                    <MenuButton
                      as={Button}
                      h={'32px'}
                      w={'250px'}
                      fontWeight={500}
                      fontSize="12px"
                      color={'blue.300'}
                      borderRadius="8px"
                      background={'white'}
                      border={'1px dashed #B1B6C5'}
                      leftIcon={<Plus strokeColor={'#6D9AF2'} />}
                      _hover={{
                        borderColor: 'blue.300',
                        color: 'blue.600',
                      }}
                    >
                      {formik.values.assigneeId
                        ? users.find((user) => user.id === formik.values.assigneeId)?.fullName ||
                          'Выбранный пользователь'
                        : 'Выберите исполнителя'}
                    </MenuButton>
                    <MenuList>
                      {users.map((user) => (
                        <MenuItem
                          key={user.id}
                          onClick={() => handleAssigneeChange(user.id)}
                        >
                          {user.fullName}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </FormControl>

                <FormControl>
                  <Menu>
                    <MenuButton
                      as={Button}
                      h={'32px'}
                      w={'250px'}
                      fontWeight={500}
                      fontSize="12px"
                      color={'blue.300'}
                      borderRadius="8px"
                      background={'white'}
                      border={'1px dashed #B1B6C5'}
                      leftIcon={<Plus strokeColor={'#6D9AF2'} />}
                      _hover={{
                        borderColor: 'blue.300',
                        color: 'blue.600',
                      }}
                    >
                      {formik.values.priority
                        ? formik.values.priority.charAt(0).toUpperCase() + formik.values.priority.slice(1)
                        : 'Выберите приоритет'}
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => handlePriorityChange('Low')}>Низкий</MenuItem>
                      <MenuItem onClick={() => handlePriorityChange('Medium')}>Средний</MenuItem>
                      <MenuItem onClick={() => handlePriorityChange('High')}>Высокий</MenuItem>
                    </MenuList>
                  </Menu>
                </FormControl>

                <FormControl>
                <Menu>
                    <MenuButton
                      as={Button}
                      h={'32px'}
                      w={'250px'}
                      fontWeight={500}
                      fontSize="12px"
                      color={'blue.300'}
                      borderRadius="8px"
                      background={'white'}
                      border={'1px dashed #B1B6C5'}
                      leftIcon={<Plus strokeColor={'#6D9AF2'} />}
                      _hover={{
                        borderColor: 'blue.300',
                        color: 'blue.600',
                      }}
                    >
                      {projects.find((p) => p.id === formik.values.boardId)?.name || 'Выберите проект'}
                    </MenuButton>
                    <MenuList>
                      {projects.map((project) => (
                        <MenuItem
                          key={project.id}
                          onClick={() => handleProjectChange(project.id)}
                        >
                          {project.name}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </FormControl>

                <Flex align={'center'} gap={'4px'}>
                  {!isDeadline ? (
                    <>
                      <Calendar />
                      <Text fontSize={'14px'} fontWeight={500}>
                        Дедлайн:{' '}
                        <chakra.span
                          fontSize={'14px'}
                          fontWeight={500}
                          color={'blue.300'}
                          cursor={'pointer'}
                          onClick={() => {
                            setDeadline(true);
                          }}
                        >
                          Указать
                        </chakra.span>
                      </Text>
                    </>
                  ) : (
                    <FormControl>
                      <Input
                        id="deadline"
                        name="deadline"
                        size="md"
                        type="datetime-local"
                        onChange={formik.handleChange}
                        value={formik.values.deadline || ''}
                      />
                    </FormControl>
                  )}
                </Flex>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Flex align={'center'} justifyContent={'space-between'} w={'100%'}>
                {type === 'edit' && isIssues && (
                  <Button
                    isDisabled={!formik.values.title.trim()}
                    type="button"
                    onClick={() => {
                      if (project) {
                        navigate(`/board/${project.id}`);
                      }
                    }}
                    w={'200px'}
                  >
                    Перейти на доску
                  </Button>
                )}
                <Flex align={'center'} gap={'20px'} w={'100%'} justifyContent={'flex-end'}>
                  <Button onClick={onClose} variant="transparent">
                    Отмена
                  </Button>
                  <Button
                  isDisabled={!formik.values.title.trim() || !formik.values.boardId}
                  type="submit"
                >
                  {type === 'create' ? 'Создать' : 'Сохранить'}
                </Button>
                </Flex>
              </Flex>
            </ModalFooter>
          </chakra.form>
        </ModalContent>
      </Modal>
    </>
  );
};