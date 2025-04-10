import { IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Button, Box } from 'shared/ui'

interface ButtonsNavigationsProps {
  title: string
  Icon: JSX.Element
  check: boolean
  onClick: () => void
}

export const ButtonsNavigations = ({
  title,
  Icon,
  check,
  onClick,
}: ButtonsNavigationsProps) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <>
      {!check ? (
        <IconButton
          isRound={true}
          aria-label="title"
          icon={Icon}
          color={check ? 'white' : 'black'}
          borderRadius="20px"
          background={check ? 'blue.300' : 'white'}
          boxShadow={
            check ? 'inset 0px 0px 5px 1px rgba(53, 53, 53, 0.25)' : ''
          }
          _hover={{
            color: 'black',
            background: 'white',
            boxShadow: ' 0px 0px 3px 2px rgba(208, 224, 255, 1)',
          }}
          onClick={onClick}
        />
      ) : (
        <Button
          fontWeight={500}
          fontSize="16px"
          color={check ? 'white' : 'black'}
          borderRadius="20px"
          background={check ? 'blue.300' : 'white'}
          boxShadow={
            check ? 'inset 0px 0px 5px 1px rgba(53, 53, 53, 0.25)' : ''
          }
          _hover={{
            color: 'black',
            background: 'white',
            boxShadow: '0px 0px 3px 2px rgba(208, 224, 255, 1)',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          transform={'rotate(270deg)'}
          onClick={onClick}
          padding="12px 24px"
        >
          <Box mr="10px">
            {React.cloneElement(Icon, {
              strokeColor: isHovered ? 'black' : 'white',
            })}
          </Box>
          {title}
        </Button>
      )}
    </>
  )
}
