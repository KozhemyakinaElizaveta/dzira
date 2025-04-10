import { SVGProps } from 'react'

export const Icon3 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width={props.width || '20'}
    height={props.height || '20'}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="20" height="20" rx="10" fill="#D0E0FF" />
    <g clipPath="url(#clip0_204_2212)">
      <path
        d="M9.02247 6.91103C9.38838 6.02966 10.6116 6.02966 10.9775 6.91103L11.2324 7.52493C11.3822 7.88587 11.7112 8.1361 12.0928 8.17934L12.804 8.25994C13.7022 8.36172 14.0732 9.48979 13.4172 10.1245L12.8133 10.7088C12.5478 10.9657 12.4305 11.3441 12.5029 11.7102L12.6487 12.4483C12.8332 13.3825 11.8324 14.0879 11.0424 13.5803L10.5655 13.2738C10.2198 13.0518 9.78015 13.0518 9.43454 13.2738L8.95758 13.5803C8.16764 14.0879 7.1668 13.3825 7.35135 12.4483L7.49715 11.7102C7.56947 11.3441 7.45216 10.9657 7.18666 10.7088L6.5828 10.1245C5.92683 9.48979 6.2978 8.36172 7.19598 8.25994L7.90719 8.17934C8.28877 8.1361 8.61776 7.88587 8.76761 7.52493L9.02247 6.91103Z"
        stroke="#2452AD"
        strokeWidth="0.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_204_2212">
        <rect width="10" height="10" fill="white" transform="translate(5 5)" />
      </clipPath>
    </defs>
  </svg>
)
