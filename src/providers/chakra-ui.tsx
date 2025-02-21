'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

export default function ChakraUIProviders({
  children
}: {
  children: React.ReactNode
}) {

  const theme = extendTheme({
    colors: {
      blue: {
        500: "#1a55e3",
      },
      red: {
        500: "#ff0854"
      },
      green: {
        500: "#00d284"
      },
      cyan: {
        500: "#0dcaf0"
      },
      purple: {
        500: "#5e6eed"
      }
    }
  })

  return (
    <ChakraProvider
      theme={theme}
      toastOptions={{
        defaultOptions: {
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        }
      }}
    >
      {children}
    </ChakraProvider>
  )
}