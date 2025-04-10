import { SVGProps } from 'react'
import { Button } from 'shared/ui'

interface ButtonsProjectsProps {
  title: string
  Icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element
  check: boolean
  onClick: () => void
}

export const ButtonsProjects = ({
  title,
  Icon,
  check,
  onClick,
}: ButtonsProjectsProps) => {
  return (
    <Button
      fontWeight={500}
      fontSize="16px"
      color={check ? 'white' : 'black'}
      borderRadius="20px"
      background={check ? 'blue.300' : 'white'}
      leftIcon={Icon && <Icon />}
      boxShadow={check ? 'inset 0px 0px 5px 1px rgba(53, 53, 53, 0.25)' : ''}
      _hover={{
        color: 'black',
        background: 'white',
        boxShadow: ' 0px 0px 3px 2px rgba(208, 224, 255, 1)',
      }}
      onClick={onClick}
    >
      {title}
    </Button>
  )
}
