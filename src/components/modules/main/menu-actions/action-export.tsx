"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";

import { Button, FormControl, MenuItem, MenuItemProps, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure, useToast } from "@chakra-ui/react";
import { ModuleInput, ModuleInputLabel } from "@/components/modules/input";

export default function MainModuleActionMenuItemExport({
  children,
  ...props
}: MenuItemProps) {
  const router = useRouter();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);

  const today = new Date();

  const [startDate, setStartDate] = useState(today.toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(today.toISOString().split("T")[0]);

  /**
   * 
   * @description
   * this function will be called when the user click the export button.
   * it still dummy function
   * 
   * @todo 
   * implement the export data functionality if the backend is ready
   * 
   * @returns void
   */
  const onExportData = async () => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/api/download/static");

      return;
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : "An error occurred while exporting data";

      return toast({
        title: "Error",
        description: message,
        status: "error",
      })
    } finally {
      setLoading(false);
    }
  }

  return (
    <Fragment>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        closeOnEsc={loading ? false : true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="md">
            Export Data
          </ModalHeader>
          <ModalBody>
            <Stack spacing={4}>
              <FormControl isRequired>
                <ModuleInputLabel label="Start Date" />
                <ModuleInput
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <ModuleInputLabel label="End Date" />
                <ModuleInput
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button
              size="sm"
              fontSize="xs"
              onClick={onClose}
              variant="ghost"
              isDisabled={loading}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              fontSize="xs"
              colorScheme="blue"
              onClick={onExportData}
              isLoading={loading}
              loadingText="Exporting..."
            >
              Export
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <MenuItem fontSize="xs" onClick={onOpen} {...props}>
        {children}
      </MenuItem>
    </Fragment>
  )
}
