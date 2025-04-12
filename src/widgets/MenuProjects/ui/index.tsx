import { Flex, Button, Input } from 'shared/ui';
import { ButtonsProjects } from 'shared/ui/menu-buttons/projects';
import { getIcon } from '../../../shared/utils/getIcon';
import { Plus } from 'shared/iconpack';
import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { useBoards } from '../lib';
import { selectCurrentBoard } from 'entities/project/model/selectors';
import { setCurrentBoard } from 'entities/project/model/slice';
import { useDispatch, useSelector } from 'react-redux';

export const MenuProjects = () => {
  const dispatch = useDispatch();
  const {projects, createNewProject} = useBoards();
  const currentProject = useSelector(selectCurrentBoard) || null;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [projectName, setProjectName] = useState('');
  const isBoards = useMatch('/boards');
  const isIssues = useMatch('/issues');
  const isTeams = useMatch('/teams');
  const isProfile = useMatch('/profile');
  const navigate = useNavigate();

  const getRandomIconIndex = () => Math.floor(Math.random() * 5); 

  const onCloseModal = () => {
    setProjectName('');
    onClose();
  };

  return (
    <>
      <Flex w="100%" ml="85px" gap="14px" mb="6px">
        <Modal isCentered isOpen={isOpen} onClose={onCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Добавление проекта</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex direction="column" gap="15px">
                <Input
                  placeholder="Название проекта"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={onCloseModal} variant="transparent">
                Отмена
              </Button>
              <Button onClick={() => {
                  if (projectName.trim()) {
                    createNewProject({ name: projectName }); 
                    onCloseModal();
                  }
                }}>
                  Создать
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <ButtonsProjects
          title={'Все проекты'}
          check={!!isBoards}
          onClick={() => {
            navigate('/boards');
          }}
        />

        {projects.map((project) => (
          <ButtonsProjects
            key={project.id}
            title={project.name.length > 10 ? `${project.name.slice(0, 10)}...` : project.name}
            Icon={getIcon(getRandomIconIndex())} 
            check={currentProject?.name === project.name && !isBoards && !isIssues && !isTeams && !isProfile}
            onClick={() => {
              dispatch(setCurrentBoard(project));
              navigate(`/board/${project.id}`); 
            }}
          />
        ))}

        <IconButton
          onClick={onOpen}
          isRound={true}
          aria-label="Plus"
          icon={<Plus />}
          color={'black'}
          borderRadius="20px"
          background="white"
          _hover={{
            color: 'black',
            background: 'white',
            boxShadow: '0px 0px 3px 2px rgba(208, 224, 255, 1)',
          }}
        />
      </Flex>
    </>
  );
};