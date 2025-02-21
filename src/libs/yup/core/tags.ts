import * as Yup from "yup";

export const createTagSchema = Yup.object().shape({
  name: Yup
    .string()
    .test('has-no-illegal-character', '', function (value) {
      const illegalCharacter = /[^a-zA-Z0-9\s]/.test(value as string);

      if (illegalCharacter) {
        return this.createError({
          message: 'Special characters are not allowed!',
        });
      }

      return true;
    })
    .min(3, "Tag Name must be atleast 3 character")
    .required("Tag name is required!")
})