import { Spinner } from '@chakra-ui/react'
import { Flex } from 'shared/ui'

const LoadingPage = () => {
  return (
    <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
       <Spinner
        w="50px"
        h="50px"
        color="#9BA0D0"
      />
    </Flex>
  )
}

export default LoadingPage
