import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginLogo } from 'shared/iconpack'
import { ContainerApp, DefaultLayout, Flex, Text } from 'shared/ui'
import { BoardMenu } from 'widgets/BoardMenu/ui'
import { MenuProjects, RightMenu } from 'widgets/index'

const HomePage = lazy(() => import('./home'))
const BoardsPage = lazy(() => import('./boards'))
const EditPage = lazy(() => import('./edit'))
const ProfilePage = lazy(() => import('./profile'))
const IssuesPage = lazy(() => import('./issues'))

export default function Routing() {
  return (
    <DefaultLayout>
        <Flex
          w="100%"
          h="125px"
          flexDirection="column"
          justifyContent="space-around"
        >
          <Flex ml="30px" align={'center'}>
            <LoginLogo />
            <Text fontSize={'32px'} fontWeight={800}>DZIRA</Text>
          </Flex>
          <Flex>
            <MenuProjects />
            <Flex justifySelf={'flex-end'} mr="30px">
              <RightMenu />
            </Flex>
          </Flex>
        </Flex>
      <Flex w="100vw" h="100%">
          <Flex h="100%" w="85px">
            <BoardMenu />
          </Flex>
        <Routes>
        <Route path="/" element={<Navigate to="/boards" />} />
        <Route
            path={'/boards'}
            element={
              <ContainerApp>
                <BoardsPage />
              </ContainerApp>
            }
          />
          <Route
            path={'/board'}
            element={
              <ContainerApp>
                <HomePage />
                </ContainerApp>
            }
          />
          <Route
            path={'/issues'}
            element={
              <ContainerApp>
                <IssuesPage />
                </ContainerApp>
            }
          />
          <Route
            path={'/edit'}
            element={
              <ContainerApp>
                <EditPage />
              </ContainerApp>
            }
          />
          <Route
            path={'/profile'}
            element={
              <ContainerApp>
                <ProfilePage />
                </ContainerApp>
            }
          />
          <Route
            path={'*'}
            element={
              <Flex
                w="100%"
                h="100%"
                justifyContent="center"
                alignItems="center"
              >
                <Text>404 page</Text>
              </Flex>
            }
          />
        </Routes>
      </Flex>
    </DefaultLayout>
  )
}
