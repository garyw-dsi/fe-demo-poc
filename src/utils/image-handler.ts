import {
  MAX_UPLOAD_IMAGE_SIZE,
  UPLOAD_IMAGE_ALLOWED_TYPES
} from "@/constants"
import { FormState } from "@/libs/api/constants";

export const imageSizeAllowed = (file: File) => { 
  if (
    file.size > MAX_UPLOAD_IMAGE_SIZE
  ) {
    return false;
  }
  return true;
}

export const imageTypeAllowed = (file: File) => {
  if (
    !UPLOAD_IMAGE_ALLOWED_TYPES.includes(file.type)
  ) {
    return false;
  }
  return true;
}

export const validateImage = (image: Blob): FormState | null => {
  if (image.size > MAX_UPLOAD_IMAGE_SIZE) {
    return { 
      status: "error", 
      message: "Image size should not exceed 1MB" 
    };
  }
  if (!UPLOAD_IMAGE_ALLOWED_TYPES.includes(image.type)) {
    return { 
      status: "error", 
      message: "Image type should be either PNG, JPEG, or JPG" 
    };
  }
  return null;
};