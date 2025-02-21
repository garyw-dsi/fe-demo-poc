"use client"

import { useRef } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogOverlay, Button, Flex, Icon, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { BsCheckCircleFill } from "react-icons/bs";

interface SuccessAlertProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  closeLabel?: string;
};

export default function SuccessAlert({
  isOpen,
  onClose,
  title,
  description,
  closeLabel
}: SuccessAlertProps) {
  const cancelRef = useRef(null)

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      size={{ base: 'full', md: 'sm' }}
      closeOnEsc={false}
    >
      <AlertDialogOverlay>
        <AlertDialogContent rounded={'xl'}>
          <Flex direction={'column'}
            justify={{ md: 'center' }}
            align={'center'}
            pt={10}
            pb={{ base: 12, md: 4 }}
            px={5}
            gap={6}
            minH={{ base: '100dvh', md: 'fit-content' }}
          >
            <Icon as={BsCheckCircleFill}
              color="green.500"
              boxSize={16}
              border={'4px solid'}
              rounded={'full'}
              borderColor={useColorModeValue('green.100', 'green.700')}
            />
            <Stack textAlign={'center'} spacing={2} pt={3} pb={8} flex={1}>
              <Text
                fontWeight={'bold'}
                fontSize={{ base: '2xl', md: 'xl' }}
              >
                {title}
              </Text>
              <Text
                fontSize={{ base: 'md', md: 'sm' }}
                color={useColorModeValue('gray.600', 'gray.400')}
              >
                {description}
              </Text>
            </Stack>

            <Button
              w={'full'}
              size={{ base: 'md', md: 'sm' }}
              fontSize={'sm'}
              onClick={onClose}
              colorScheme="green"
            >
              {closeLabel || 'Close'}
            </Button>
          </Flex>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}