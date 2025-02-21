"use client"
/* eslint-disable react-hooks/exhaustive-deps */

import { getContactOptions } from "@/app/actions/modules/core/contacts";
import { ModuleInput, ModuleInputLabel } from "@/components/modules/input";
import debounce from "@/utils/debounce";
import { Button, Flex, FormControl, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setCustomerName: (name: string) => void;
  customerName: string;
  isContactExist: ContactExist;
  setIsContactExist: (value: ContactExist) => void;
}

type ContactExist = "exist" | "not-exist" | "idle";

export default function ModuleCRMCustomerContactCheck({
  isOpen,
  onClose,
  setCustomerName,
  customerName,
  isContactExist,
  setIsContactExist
}: Props) {
  const router = useRouter();

  const [tempName, setTempName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getOptions = async (inputValue: string): Promise<boolean> => {
    setLoading(true);
    try {
      const data = await getContactOptions({ name: inputValue });
      if (data && data.length > 0) {
        setIsContactExist("exist");
        return true;
      } else {
        setIsContactExist("not-exist");
      }
    } finally {
      setLoading(false);
    }
    return false;
  };

  const onCustomerChange = useCallback(
    debounce(
      (inputValue: string) => {
        if (!inputValue) {
          setIsContactExist("idle");
          return;
        }

        getOptions(inputValue).then((options) => {
          if (!options) {
            setTempName(inputValue);
          }
        });
      },
      500
    ), []
  );

  const onProcess = () => {
    setCustomerName(tempName);
    onClose();
  }

  const onCancel = () => {
    if (isContactExist === "not-exist" && customerName) {
      onClose();
      setIsContactExist("not-exist");
      return;
    }

    if (isContactExist === "exist" && customerName) {
      onClose();
      setIsContactExist("not-exist");
      return;
    }

    router.push("/modules/crm/customers");
    return;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      size={{ base: 'full', md: 'lg' }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader as={Stack} spacing={1}>
          <Text
            fontSize={'md'}
            fontWeight={'semibold'}
          >
            Contact Check
          </Text>
          <Text
            fontSize={'xs'}
            color={'gray.500'}
            lineHeight={1.6}
          >
            Before you can create a customer, you need to check either the contact is already exist or not.
          </Text>
        </ModalHeader>
        <ModalBody>
          <FormControl>
            <ModuleInputLabel label="Customer Name" />
            <ModuleInput
              placeholder="Customer Name"
              defaultValue={customerName}
              onChange={(e) => onCustomerChange(e.target.value)}
            />
          </FormControl>

          {isContactExist !== "idle" && (
            <Flex justify={'end'}>
              <Button
                variant={'ghost'}
                isLoading={loading}
                loadingText="Checking..."
                size={'sm'}
                fontSize={'xs'}
                p={0}
                colorScheme={isContactExist === "exist" ? "red" : "green"}
                _hover={{ bg: 'transparent' }}
                cursor={'default'}
              >
                {isContactExist === "exist"
                  ? "Contact already Exist please select another name"
                  : "Customer name is available"
                }
              </Button>
            </Flex>
          )}
        </ModalBody>
        <ModalFooter gap={3}>
          <Button
            size={'sm'}
            fontSize={'xs'}
            colorScheme="gray"
            onClick={onCancel}
          >
            Cancel
          </Button>
          {(isContactExist === "not-exist" && tempName) && (
            <Button
              size={'sm'}
              fontSize={'xs'}
              colorScheme="blue"
              onClick={onProcess}
            >
              Process
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}