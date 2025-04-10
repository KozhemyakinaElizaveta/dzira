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
import { useDispatch, useSelector } from 'react-redux';
import { addTaskToProject, setCurrentProject, updateTaskInProject } from 'entities/project/model/slice';
import { selectCurrentProject, selectAllProjects, selectCurrentTask } from 'entities/project/model/selectors';
import { useMatch, useNavigate } from 'react-router-dom';
import { CurrentProject } from 'entities/project/model/types';

export const CreateTaskModal = (
  { 
    type,
    onClose,
    isOpen,
    project 
  }: 
  { 
    type: 'create' | 'edit',
    isOpen: UseDisclosureReturn['isOpen']
    onClose: UseDisclosureReturn['onClose']
    project?: CurrentProject 
  }) => {
  const [isDeadline, setDeadline] = useState(false);
  const [isTag, setTag] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const currentProject = useSelector(selectCurrentProject);
  const allProjects = useSelector(selectAllProjects);
  const currentTask = useSelector(selectCurrentTask); 

  const isIssues = useMatch('/issues')

  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    tags: [] as string[],
    deadline: '',
    assignee: '',
    priority: 'medium',
    projectId: currentProject?.id || null,
  });

  useEffect(() => {
    if (type === 'edit' && currentTask) {
      setFormValues({
        name: currentTask.name,
        description: currentTask.description,
        tags: currentTask.tags,
        deadline: currentTask.deadline,
        assignee: `${currentTask.last_name}_${currentTask.first_name}`,
        priority: currentTask.priority,
        projectId: allProjects.find((p) => p.title === currentTask.project)?.id || null,
      });
    }
  }, [type, currentTask, allProjects]);

  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const tagsArray = value ? value.split(',').map((tag) => tag.trim()) : [];
    setFormValues((prev) => ({ ...prev, tags: tagsArray }));
  };

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = event.target.value;
      setFormValues((prev) => ({ ...prev, [field]: value }));
    };

  const handleAssigneeChange = (assignee: string) => {
    setFormValues((prev) => ({ ...prev, assignee }));
  };

  const handlePriorityChange = (priority: string) => {
    setFormValues((prev) => ({ ...prev, priority }));
  };

  const handleProjectChange = (projectId: number) => {
    setFormValues((prev) => ({ ...prev, projectId }));
  };

  const handleSubmit = () => {
    if (!formValues.name.trim()) {
      alert('Введите название задачи');
      return;
    }
    if (!formValues.projectId) {
      console.error('Проект не выбран');
      return;
    }

    if (type === 'create') {
      dispatch(
        addTaskToProject({
          projectId: formValues.projectId,
          task: {
            id: String(Date.now()),
            section_id: 1,
            name: formValues.name,
            description: formValues.description,
            deadline: formValues.deadline || '',
            finished: false,
            tags: formValues.tags,
            project: allProjects.find((p) => p.id === formValues.projectId)?.title || '',
            number: Date.now(),
            tag: formValues.tags[0] || '',
            date: new Date(formValues.deadline || '').toLocaleDateString('ru-RU'),
            last_name: formValues.assignee.split('_')[0] || 'Иванов',
            first_name: formValues.assignee.split('_')[1] || 'Иван',
            priority: formValues.priority,
            branch: '/main',
          },
        })
      );
    } else if (type === 'edit' && currentTask) {
      dispatch(
        updateTaskInProject({
          projectId: formValues.projectId,
          taskId: currentTask.id,
          updates: {
            name: formValues.name,
            description: formValues.description,
            deadline: formValues.deadline,
            tags: formValues.tags,
            project: allProjects.find((p) => p.id === formValues.projectId)?.title || '',
            last_name: formValues.assignee.split('_')[0],
            first_name: formValues.assignee.split('_')[1],
            priority: formValues.priority,
          },
        })
      );
    }

    setFormValues({
      name: '',
      description: '',
      tags: [],
      deadline: '',
      assignee: '',
      priority: 'medium',
      projectId: currentProject?.id || allProjects[0]?.id || 1,
    });
    onClose();
  };

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent w={'800px'}>
          <ModalHeader>{type === 'create' ? 'Создание задачи' : 'Редактирование задачи'}</ModalHeader>
          <chakra.form w={'100%'}>
            <ModalBody>
              <Flex flexDir={'column'} gap={'15px'}>
                <FormControl isRequired>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Задача"
                    onChange={handleInputChange('name')}
                    value={formValues.name}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    id="description"
                    name="description"
                    placeholder="Описание"
                    onChange={handleInputChange('description')}
                    value={formValues.description}
                  />
                </FormControl>
                {!isTag ? (
                  <Button
                    h={'32px'}
                    w={'121px'}
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
                    onClick={() => {
                      setTag(true);
                    }}
                  >
                    Добавить тег
                  </Button>
                ) : (
                  <FormControl>
                    <Input
                      id="tags"
                      name="tags"
                      placeholder="Введите теги через запятую"
                      onChange={handleTagsChange}
                      value={formValues.tags.join(', ') || ''}
                      w={'250px'}
                      h={'32px'}
                    />
                  </FormControl>
                )}
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
                      {formValues.assignee ? formValues.assignee.replace('_', ' ') : 'Выберите исполнителя'}
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => handleAssigneeChange('Петров_Максим')}>Петров Максим</MenuItem>
                      <MenuItem onClick={() => handleAssigneeChange('Холоднов_Михаил')}>Холоднов Михаил</MenuItem>
                      <MenuItem onClick={() => handleAssigneeChange('Юношева_Анна')}>Юношева Анна</MenuItem>
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
                      {formValues.priority
                        ? formValues.priority.charAt(0).toUpperCase() + formValues.priority.slice(1)
                        : 'Выберите приоритет'}
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => handlePriorityChange('low')}>Низкий</MenuItem>
                      <MenuItem onClick={() => handlePriorityChange('medium')}>Средний</MenuItem>
                      <MenuItem onClick={() => handlePriorityChange('high')}>Высокий</MenuItem>
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
                      {allProjects.find((p) => p.id === formValues.projectId)?.title || 'Выберите проект'}
                    </MenuButton>
                    <MenuList>
                      {allProjects.map((project) => (
                        <MenuItem key={project.id} onClick={() => {
                          if (project.id === null) {
                            return;
                          }
                          handleProjectChange(project.id);
                        }}>
                          {project.title}
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
                        onChange={handleInputChange('deadline')}
                        value={formValues.deadline}
                      />
                    </FormControl>
                  )}
                </Flex>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Flex align={'center'} justifyContent={'space-between'} w={'100%'}>
                {type === 'edit' && isIssues &&
              <Button
                isDisabled={!formValues.name.trim()}
                type="button"
                onClick={() => {
                  if(project){
                  dispatch(setCurrentProject(project))
                  navigate('./board')
                }}
                }
                w={'200px'}
              >
                Перейти на доску
              </Button>}
              <Flex align={'center'} gap={'20px'} w={'100%'} justifyContent={'flex-end'}>
              <Button onClick={onClose} variant="transparent">
                Отмена
              </Button>
              <Button
                isDisabled={!formValues.name.trim()}
                type="button"
                onClick={handleSubmit}
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