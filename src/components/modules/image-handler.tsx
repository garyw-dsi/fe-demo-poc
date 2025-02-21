import { Products } from "@/libs/yup/inventory/product";
import { Button, Flex, Icon, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { FaTrashAlt } from "react-icons/fa";
import { TbPhotoPlus } from "react-icons/tb";

interface SelectImageProps {
  handleClick: () => void;
}

export const ModuleSelectImage = ({
  handleClick
}: SelectImageProps) => {
  return (
    <Flex
      w="10rem"
      h="10rem"
      align="center"
      justify="center"
      rounded="md"
      border="1px dashed"
      bg={useColorModeValue('gray.100', 'gray.900')}
      borderColor={useColorModeValue('gray.400', 'gray.600')}
      direction="column"
      gap={2}
      color={useColorModeValue('gray.500', 'gray.500')}
      cursor="pointer"
      onClick={handleClick}
    >
      <Icon as={TbPhotoPlus} boxSize={8} />
      <Text fontSize="xs">Add Image</Text>
    </Flex>
  )
}

interface ShowImageProps {
  onChangeImage: () => void;
  onDeleteImage: () => void;
}

export const ModuleShowImage = ({
  onChangeImage,
  onDeleteImage
}: ShowImageProps) => {
  const { values } = useFormikContext<Products>();
  return (
    <Flex
      justify={'center'}
      align={'center'}
      direction={'column'}
      gap={2}
    >
      <Image
        src={values.image || ""}
        alt="Product Image"
        objectFit="cover"
        w="10rem"
        h="10rem"
        objectPosition="center"
        rounded="md"
        cursor="pointer"
      />
      <Flex w={'full'} gap={2}>
        <Button
          w={'full'}
          size={'sm'}
          fontSize={'xs'}
          onClick={onChangeImage}
        >
          Change Image
        </Button>
        <Button
          size={'sm'}
          colorScheme="red"
          onClick={onDeleteImage}
        >
          <Icon as={FaTrashAlt} boxSize={3} />
        </Button>
      </Flex>
    </Flex>
  )
}
