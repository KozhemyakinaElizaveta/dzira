import { Flex, Button, Input, Text } from 'shared/ui'
import { ButtonsProjects } from 'shared/ui/menu-buttons/projects'
import { getIcon } from '../../../shared/utils/getIcon'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentProject, addProject } from 'entities/project/model/slice'
import { selectCurrentProject, selectAllProjects } from 'entities/project/model/selectors'
import { Plus } from 'shared/iconpack'
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
  useToast,
} from '@chakra-ui/react'
import { Icon1 } from 'shared/utils/icons/icon1'
import { Icon2 } from 'shared/utils/icons/icon2'
import { Icon3 } from 'shared/utils/icons/icon3'
import { Icon4 } from 'shared/utils/icons/icon4'
import { Icon5 } from 'shared/utils/icons/icon5'
import { useState } from 'react'
import { CurrentProject } from 'entities/project/model/types'
import { useMatch, useNavigate } from 'react-router-dom'

export const MenuProjects = () => {
  const dispatch = useDispatch()
  const toast = useToast()
  const projects = useSelector(selectAllProjects) as CurrentProject[] 
  const currentProject = useSelector(selectCurrentProject) as CurrentProject | null 
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [projectName, setProjectName] = useState('')
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null)
  const isBoards = useMatch('/boards')
  const isIssues = useMatch('/issues')

    const navigate = useNavigate()

  const handleIconClick = (iconIndex: number) => {
    setSelectedIcon(iconIndex)
  }

  const handleCreateProject = () => {
    if (selectedIcon === null) {
      toast({
        title: 'Ошибка',
        description: 'Выберите иконку для проекта',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    if (projectName.trim()) {
      const newProject: CurrentProject = {
        id: Date.now(),
        title: projectName,
        icon: selectedIcon,
      }

      dispatch(
        addProject({
          title: newProject.title,
          icon: newProject.icon,
        })
      )
      toast({
        title: 'Успех',
        description: 'Проект создан',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      onClose()
      setProjectName('')
      setSelectedIcon(null)
    } else {
      toast({
        title: 'Ошибка',
        description: 'Необходимо имя проекта',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Flex w="100%" ml="85px" gap="14px" mb="6px">
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
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
                <Text fontSize="19px">Выберите иконку для проекта:</Text>
                <Flex h="40px" w="100%" gap="10px">
                  {[Icon1, Icon2, Icon3, Icon4, Icon5].map((Icon, index) => (
                    <Flex
                      key={index}
                      justify="center"
                      align="center"
                      border={
                        selectedIcon === index
                          ? '2px solid #2452AD'
                          : '2px solid transparent'
                      }
                      borderRadius="50px"
                      cursor="pointer"
                      onClick={() => handleIconClick(index)}
                    >
                      <Icon width="35" height="35" />
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={onClose} variant="transparent">
                Отмена
              </Button>
              <Button onClick={handleCreateProject}>Создать</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <ButtonsProjects
            title={'Все проекты'}
            check={!!isBoards}
            onClick={() => {
              navigate('./boards')
            }}
          />
        {projects.map((project) => (
          <ButtonsProjects
            key={project.id} 
            title={project.title}
            Icon={getIcon(project.icon)}
            check={currentProject?.title === project.title && !isBoards && !isIssues}
            onClick={() => {
              dispatch(setCurrentProject(project))
              navigate('./board')
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
            boxShadow: ' 0px 0px 3px 2px rgba(208, 224, 255, 1)',
          }}
        />
      </Flex>
    </>
  )
}