import { Pause, Play } from 'shared/iconpack'
import { Box, Flex, Text } from '..'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'shared/config/redux/store'
import { startTimer, stopTimer } from 'entities/timerSlice/timerSlice'
import { useEffect, useState } from 'react'

interface TimerProps {
  taskId: string
}

export const Timer = ({ taskId }: TimerProps) => {
  const dispatch = useDispatch()
  const timer = useSelector((state: RootState) => state.timer[taskId])
  const [displayTime, setDisplayTime] = useState('00:00:00')

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>

    if (timer?.isRunning) {
      interval = setInterval(() => {
        const elapsed = Date.now() - (timer.startTime || 0)
        const hours = Math.floor(elapsed / 3600000)
        const minutes = Math.floor((elapsed % 3600000) / 60000)
        const seconds = Math.floor((elapsed % 60000) / 1000)
        setDisplayTime(
          `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        )
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [timer])

  const handleStart = (event: React.MouseEvent) => {
    event.stopPropagation()
    dispatch(startTimer(taskId))
  }

  const handlePause = (event: React.MouseEvent) => {
    event.stopPropagation()
    dispatch(stopTimer(taskId))
  }

  return (
    <Box w={'100px'}>
      {!timer?.isRunning ? (
        <Flex
          align={'center'}
          gap={'5px'}
          cursor={'pointer'}
          _hover={{ bgColor: 'blue.200' }}
          p={'8px'}
          borderRadius={'12px'}
          onClick={handleStart}
          w={'fit-content'}
        >
          <Play />
          <Text color={'blue.500'} fontSize={'12px'}>
            {displayTime === '00:00:00' ? 'Начать' : 'Продолжить'}
          </Text>
        </Flex>
      ) : (
        <Flex alignItems={'center'} gap={'5px'}>
          <>
            <Box onClick={handlePause} cursor={'pointer'}>
              <Pause />
            </Box>
            <Text color={'blue.500'} fontSize={'12px'}>
              {displayTime}
            </Text>
          </>
        </Flex>
      )}
    </Box>
  )
}
