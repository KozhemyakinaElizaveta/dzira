import { Close } from 'shared/iconpack'
import { Box, Flex, Text } from '..'
import React from 'react'

interface TagProps {
  tag: string
  withIcon?: boolean
}
export const Tag = ({ tag, withIcon }: TagProps) => (
  <Flex
    alignItems={'center'}
    bgColor={'gray.500'}
    borderRadius={'8px'}
    w={withIcon ? '94px' : '82px'}
    h={withIcon ? '32px' : '25px'}
    justifyContent={'center'}
    gap={'5px'}
  >
    <Text
      textAlign={'center'}
      color={'white'}
      fontSize={'12px'}
      fontWeight={400}
    >
      {tag}
    </Text>
    {withIcon && (
      <Box cursor={'pointer'} onClick={() => {}}>
        {React.cloneElement(<Close />, {
          strokeColor: 'white',
        })}
      </Box>
    )}
  </Flex>
)
