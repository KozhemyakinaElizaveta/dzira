import { ReactNode } from 'react'
import { ReactStrictModeProvider } from './ReactStrictModeProvider'
import { RouterProvider } from './RouterProvider'
import { CustomChakraProvider } from './ChakraProvider'
import { CustomReduxProvider } from './ReduxProvaider'

interface CombinedProvidersProps {
  children: ReactNode
}

export const CombinedProviders = ({ children }: CombinedProvidersProps) => {
  return (
    <ReactStrictModeProvider>
      <CustomChakraProvider>
        <CustomReduxProvider>
          <RouterProvider>{children}</RouterProvider>
        </CustomReduxProvider>
      </CustomChakraProvider>
    </ReactStrictModeProvider>
  )
}
