import { useToast } from "@chakra-ui/react";
import { getProjects } from "entities/project/api";
import { useEffect, useMemo, useState } from "react";

export interface GetBoardsResponse {
    description: string;
    id: number;
    name: string;
    taskCount: number;
  }

export const useBoards = () => {
  const toast = useToast();
  const [projectsData, setProjectsData] = useState<GetBoardsResponse[]>([]); 
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  useEffect(() => {
    setIsLoading(true); 
    getProjects()
      .then((response) => {
        setProjectsData(response.data.data);
      })
      .catch(() => {
        toast({
          position: "bottom-right",
          title: "Ошибка",
          description: "Не удалось получить проекты",
          status: "error",
          duration: 9000,
          isClosable: true,
          variant: "top-accent",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const data = useMemo(() => {
    if (!projectsData || projectsData.length === 0) {
      return {
        totalProjects: 0,
        projects: [],
      };
    }
    return {
      totalProjects: projectsData.length,
      projects: projectsData.map((project) => ({
        id: project.id,
        name: project.name,
        description: project.description,
        taskCount: project.taskCount,
      })),
    };
  }, [projectsData]);

  return {
    ...data,
    isLoading, 
  };
};