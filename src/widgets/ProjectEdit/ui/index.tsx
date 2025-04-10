import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentProject } from 'entities/project/model/selectors';
import { Flex, Text, Input } from 'shared/ui';
import { getIcon } from 'shared/utils/getIcon';
import { IconButton } from '@chakra-ui/react';
import { EditText } from 'shared/iconpack';
import { updateProjectTitle } from 'entities/project/model/slice'; 

export const ProjectEdit = () => {
  const dispatch = useDispatch();
  const currentProject = useSelector(selectCurrentProject);

  const Icon = getIcon(currentProject.icon);

  const [isEditing, setIsEditing] = useState(false);
  const [projectTitle, setProjectTitle] = useState(currentProject.title);

  useEffect(() => {
    setProjectTitle(currentProject.title);
  }, [currentProject]);

  const handleSave = () => {
    if (currentProject.id === null) {
      console.error('Невозможно обновить проект с null ID');
      return;
    }
    dispatch(
      updateProjectTitle({
        projectId: currentProject.id,
        newTitle: projectTitle,
      })
    );
    setIsEditing(false);
  };

  return (
    <Flex gap="12px" alignItems="center">
      <Icon width="55px" height="55px" />

      {isEditing ? (
        <Input
          w="300px"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
          }}
          autoFocus
        />
      ) : (
        <Text fontWeight={700} fontSize="20px">
          {projectTitle}
        </Text>
      )}

      <IconButton
        onClick={() => setIsEditing(true)}
        colorScheme="transparent"
        icon={<EditText />}
        aria-label={'Редактировать'}
      />
    </Flex>
  );
};