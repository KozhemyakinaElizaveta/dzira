import { SVGProps } from 'react'
import { Icon1 } from './icons/icon1'
import { Icon2 } from './icons/icon2'
import { Icon3 } from './icons/icon3'
import { Icon4 } from './icons/icon4'
import { Icon5 } from './icons/icon5'

export const getIcon = (
  num: number | null
): ((props: SVGProps<SVGSVGElement>) => JSX.Element) => {
  switch (num) {
    case 1:
      return Icon1
    case 2:
      return Icon2
    case 3:
      return Icon3
    case 4:
      return Icon4
    case 5:
      return Icon5
    default:
      return Icon1
  }
}
