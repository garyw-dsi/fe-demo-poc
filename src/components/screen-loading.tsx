"use client"

import { AlertDialog, AlertDialogContent, AlertDialogOverlay, Flex, Spinner, Text } from "@chakra-ui/react"
import { useRef } from "react"

export default function ScreenTransitionLoading({
  pending
}: {
  pending: boolean
}) {
  const cancelRef = useRef<null>(null);

  return (
    <AlertDialog
      isOpen={pending}
      onClose={() => { }}
      leastDestructiveRef={cancelRef}
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <AlertDialogOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px)'
      />
      <AlertDialogContent bg={"transparent"} border={'none'} shadow={'none'}>
        <Flex align={'center'} justify={'center'} direction={'column'} gap={5}>
          <Spinner colorScheme="blue" />
          <Text fontSize={'xs'}>
            Hold on a second...
          </Text>
        </Flex>
      </AlertDialogContent>
    </AlertDialog>
  )
}