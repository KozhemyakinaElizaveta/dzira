import { SVGProps } from 'react'

export const Icon2 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width={props.width || '20'}
    height={props.height || '20'}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="20" height="20" rx="10" fill="#D0E0FF" />
    <path
      d="M6.65996 9.83782L8.79916 12.7129C9.41479 13.5403 10.5852 13.5403 11.2008 12.7129L13.34 9.83782C13.8867 9.10319 13.8867 8.05932 13.34 7.32469C12.5399 6.24929 10.6905 6.56868 10 7.72865C9.30954 6.56868 7.46012 6.24929 6.65996 7.32469C6.11335 8.05932 6.11335 9.10319 6.65996 9.83782Z"
      stroke="#2452AD"
      strokeWidth="0.625"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
