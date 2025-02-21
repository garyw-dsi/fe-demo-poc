import * as Yup from "yup"

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is invalid")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required"),
  rememberMe: Yup.boolean()
});

export const registerSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[a-zA-Z ]*$/, "First name must contain only alphabets")
    .required("First name is required"),
  last_name: Yup.string()
    .matches(/^[a-zA-Z ]*$/, "Last name must contain only alphabets")
    .required("Last name is required"),
  email: Yup.string()
    .email("Email is invalid")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/(?=.*[0-9])/, "Password must contain a number")
    .matches(/(?=.*[A-Z])/, "Password must contain an uppercase letter")
    .matches(/(?=.*[a-z])/, "Password must contain a lowercase letter")
    .matches(/(?=.*[!@#$%^&*])/, "Password must contain a special character")
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Password does not match!')
    .required("Password confirmation is required")
});

export const requestResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is invalid")
    .required("Email is required"),
});

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/(?=.*[0-9])/, "Password must contain a number")
    .matches(/(?=.*[A-Z])/, "Password must contain an uppercase letter")
    .matches(/(?=.*[a-z])/, "Password must contain a lowercase letter")
    .matches(/(?=.*[!@#$%^&*])/, "Password must contain a special character")
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Password does not match!')
    .required("Password confirmation is required")
});

export const changePasswordSchema = Yup.object().shape({
  old_password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/(?=.*[0-9])/, "Password must contain a number")
    .matches(/(?=.*[A-Z])/, "Password must contain an uppercase letter")
    .matches(/(?=.*[a-z])/, "Password must contain a lowercase letter")
    .matches(/(?=.*[!@#$%^&*])/, "Password must contain a special character")
    .required("Password is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/(?=.*[0-9])/, "Password must contain a number")
    .matches(/(?=.*[A-Z])/, "Password must contain an uppercase letter")
    .matches(/(?=.*[a-z])/, "Password must contain a lowercase letter")
    .matches(/(?=.*[!@#$%^&*])/, "Password must contain a special character")
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Password does not match!')
    .required("Password confirmation is required")
});