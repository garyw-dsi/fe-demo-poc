"use client"

import { useRef, useCallback, useMemo } from "react";
import { Flex, Input, Text, ToastProps, useToast } from "@chakra-ui/react";
import { useFormikContext } from "formik";

import { Products } from "@/libs/yup/inventory/product";
import { imageSizeAllowed, imageTypeAllowed } from "@/utils/image-handler";
import { ModuleSelectImage, ModuleShowImage } from "@/components/modules/image-handler";

interface ModuleInventoryProductSetImageProps {
  setFile: (file: File | null) => void;
}

interface ToastMessages {
  sizeError: ToastProps;
  typeError: ToastProps;
}

export default function ModuleInventoryProductSetImage({
  setFile
}: ModuleInventoryProductSetImageProps) {
  const toast = useToast();
  const imageRef = useRef<HTMLInputElement>(null);
  const { setFieldValue, values, setTouched } = useFormikContext<Products>();

  const handleClick = () => {
    setTouched({ 'image': true });
    imageRef.current?.click()
  }

  const onDeleteImage = () => {
    setTouched({ 'image': true });
    setFile(null);
    setFieldValue('image', '');

    if (imageRef.current) {
      imageRef.current.value = '';
    }
  }

  const toastMessages: ToastMessages = useMemo(() => ({
    sizeError: {
      title: <Text>Size Error</Text>,
      description: <Text>File size should not exceed 1MB.</Text>,
      status: 'warning',
    },
    typeError: {
      title: <Text>Type Error</Text>,
      description: <Text>File type should be either PNG, JPEG, or JPG.</Text>,
      status: 'warning',
    }
  }), []);

  const onImageSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    if (
      !imageSizeAllowed(file)
    ) {
      return toast(toastMessages.sizeError);
    }

    if (
      !imageTypeAllowed(file)
    ) {
      return toast(toastMessages.typeError);
    }

    setFile(file);
    setFieldValue('image', URL.createObjectURL(file));

  }, [setFieldValue, setFile, toast, toastMessages]);

  return (
    <Flex w="full" align={'center'} justify={'center'}>
      <Input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        hidden
        ref={imageRef}
        onChange={onImageSelect}
      />
      {values.image
        ? (
          <ModuleShowImage
            onChangeImage={handleClick}
            onDeleteImage={onDeleteImage}
          />
        )
        : <ModuleSelectImage handleClick={handleClick} />
      }
    </Flex>
  )
}
