"use client"

import { Fragment, useRef, useState } from "react";
import { Button, Flex, Input, MenuItem, MenuItemProps, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";

interface MainModuleActionMenuItemImportProps
  extends MenuItemProps {
  fileAccept?: string[];
  onImport?: (file: File | null) => void;
  templateDownload?: React.ReactNode;
}

/**
 * 
 * @param fileAccept
 * @param templateDownload
 * @param onImport
 * @param children
 * 
 * @description
 * 'fileAccept' is an array of string that will be used to filter the file input accept attribute.
 * this props is optional. if not provided, the file input will accept all file types.
 * 
 * @description 
 * 'templateDownload' is a ReactNode that will be displayed above the file input. 
 * this props is optional. if not provided, the file input will be displayed without any additional information.
 * 
 * @description
 * 'onImport' is a function that will be called when the user click the import button.
 * this props is optional. if not provided, the import button will not do anything.
 * 
 * @description
 * 'children' is a ReactNode that will be displayed as the menu item content.
 * 
 * @returns `<MainModuleActionMenuItemImport />`
 */
export default function MainModuleActionMenuItemImport({
  fileAccept = ["csv", "xls", "xlsx"],
  templateDownload,
  onImport,
  children,
  ...props
}: MainModuleActionMenuItemImportProps) {
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onFileChange = () => {
    fileRef.current?.click();
  }

  return (
    <Fragment>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        closeOnEsc={true}
      >
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('white', 'gray.800')}>
          <ModalHeader fontSize={'md'}>
            Import Data
          </ModalHeader>
          <ModalBody>
            <Input
              type={'file'}
              hidden
              display={'none'}
              ref={fileRef}
              accept={fileAccept?.join(', ')}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFile(file);
                }
              }}
            />
            <Stack spacing={5}>
              {templateDownload}
              <Flex
                border={'1px'}
                rounded={'md'}
                align={'center'}
                justify={'center'}
                minH={'25vh'}
                borderStyle={'dashed'}
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                bg={useColorModeValue('gray.50', 'gray.900')}
                cursor={'pointer'}
                onClick={onFileChange}
              >
                <Stack align={'center'}>
                  <Button
                    size={'sm'}
                    fontSize={'xs'}
                    w={'fit-content'}
                  >
                    {file ? "Change File" : "Select File"}
                  </Button>
                  <Text fontSize={'sm'}
                    color={useColorModeValue('gray.500', 'gray.500')}
                  >
                    {file?.name || "Select your file to import to the system."}
                  </Text>
                  <Text fontSize={'xs'}
                    color={useColorModeValue('gray.500', 'gray.500')}
                  >
                    only accept {fileAccept?.join(', ')}
                  </Text>
                </Stack>
              </Flex>
            </Stack>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button
              size={'sm'}
              fontSize={'xs'}
              onClick={onClose}
              variant={'ghost'}
            >
              Cancel
            </Button>
            {onImport && (
              <Button
                size={'sm'}
                fontSize={'xs'}
                colorScheme={'blue'}
                onClick={() => {
                  onImport(file);
                  setFile(null);

                  onClose();
                }}
              >
                Import
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <MenuItem
        fontSize={'xs'}
        onClick={onOpen}
        {...props}
      >
        {children}
      </MenuItem>
    </Fragment>
  )
}