import * as Yup from "yup";

export const createGroupSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z0-9 ]*$/, "Alphanumeric characters only")
    .required("Name Group is required"),
  parent_id: Yup.number()
    .typeError("Parent Group is required")
    .positive("Parent Group is required")
    .required("Parent Group is required")
});

export const setPermissionSchema = Yup.object().shape({
  permissions: Yup.array()
    .of(Yup.number())
});

export type CreateUser = Yup.InferType<typeof createUsersSchema>;

export const createUsersSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[a-zA-Z ]*$/, "Alphabetic characters only")
    .required("First Name is required"),
  last_name: Yup.string()
    .matches(/^[a-zA-Z ]*$/, "Alphabetic characters only")
    .required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  group_id: Yup.number()
    .typeError("Group is required")
    .positive("Group is required")
    .min(1, "Group is required")
    .integer("Group is required")
    .required("Group is required"),
  image: Yup
    .string()
    .nullable()
    .optional(),
});

export type EditUser = Yup.InferType<typeof editUserSchema>;

export const editUserSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[a-zA-Z ]*$/, "Alphabetic characters only")
    .required("First Name is required"),
  last_name: Yup.string()
    .matches(/^[a-zA-Z ]*$/, "Alphabetic characters only")
    .required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  group_id: Yup.number()
    .typeError("Group is required")
    .positive("Group is required")
    .min(1, "Group is required")
    .integer("Group is required")
    .required("Group is required"),
  image: Yup
    .string()
    .nullable()
    .optional(),
  is_locked: Yup.boolean()
    .required("Lock status is required"),
  is_active: Yup.boolean()
    .required("Active status is required"),
});

export type Organization = Yup.InferType<typeof organizationSchema>;

export const organizationSchema = Yup.object().shape({
  legal_name: Yup.string()
    .matches(/^[a-zA-Z0-9 ]*$/, 'Symbols are not allowed')
    .required("Legal Name is required!"),
  legal_type: Yup.string()
    .matches(/^[a-zA-Z0-9 ]*$/, 'Symbols are not allowed')
    .required("Legal Type is required!"),
  image: Yup
    .string()
    .nullable()
    .optional(),
});

export const organizationTransferMaintainSchema = Yup.object().shape({
  maintainer_id: Yup.number()
    .typeError("Maintainer is required")
    .positive("Maintainer is required")
    .min(1, "Maintainer is required")
    .integer("Maintainer is required")
    .required("Maintainer is required")
}); 