import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Flex } from 'shared/ui'
import { Board } from 'widgets/index'

const HomePage = () => {
  return (
    <Flex h="80vh">
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    </Flex>
  )
}

export default HomePage
